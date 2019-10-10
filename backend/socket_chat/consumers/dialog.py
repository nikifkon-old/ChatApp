from datetime import datetime
from channels.db import database_sync_to_async
from django.core.exceptions import (
    ObjectDoesNotExist,
    ValidationError,
)

from backend.api.v1.dialogs.serializers import (
    DialogMessageSerializer,
    DialogSerializer,
)
from backend.dialogs.models import (
    DialogMessage,
    Dialog,
    DialogMembership,
)
from backend.socket_chat.consumers.base import private


class DialogConsumer:
    @private
    async def event_dialog_create(self, event):
        """ Handle dialog.create """
        try:
            id = int(event['data']['id'])
        except KeyError:
            return await self.throw_missed_field(event=event['event'])
        data, dialog_id, is_ok = await self.dialog_create(id)
        if is_ok:
            users = [self.user.id, id]
            room = f'dialog_{dialog_id}'

            await self.channel_layer.group_send('general', {
                'type': 'connect_users',
                'event': event['event'],
                'data': {
                    'users': users,
                    'room': room,
                    'room_data': data
                }
            })
        else:
            await self._throw_error(
                data,
                event=event['event']
            )

    @private
    async def event_dialog_delete(self, event):
        """ Handle dialog.delete """
        try:
            id = event['data']['id']
        except KeyError:
            return await self.throw_missed_field(event=event['event'])
        data, is_ok = await self.delete_dialog(id)
        if is_ok:
            dialog_id = data['dialog_id']
            await self.channel_layer.group_send(f'dialog_{dialog_id}', {
                'type': 'channels_message',
                'event': event['event'],
                'data': data
            })
        else:
            await self._throw_error(
                data,
                event=event['event']
            )

    @private
    async def event_dialog_message_send(self, event):
        """ Handle dialog.message.send event """
        try:
            id = event['data']['id']
            text = event['data']['text']
        except KeyError:
            return await self.throw_missed_field(event=event['event'])

        new_message = await self.dialog_send_message(id, text)
        await self.channel_layer.group_send(f'dialog_{id}', {
            'type': 'channels_message',
            'event': event['event'],
            'data': new_message
        })

    @private
    async def event_dialog_message_delete(self, event):
        """ Handle dialog.message.delete event """
        try:
            id = event['data']['id']  # message id
        except KeyError:
            return await self.throw_missed_field(event=event['event'])

        data, is_ok = await self.dialog_delete_message(id)
        if is_ok:
            await self.channel_layer.group_send(
                'dialog_%d' % data.get('dialog_id'),
                {
                    'type': 'channels_message',
                    'event': event['event'],
                    'data': data
                }
            )
        else:
            await self._throw_error(
                {
                    'detail': 'Message doesn\'t exist'
                },
                event=event
            )

    @private
    async def event_dialog_message_update(self, event):
        """ Handle dialog.message.update event """
        try:
            id = event['data']['id']
            text = event['data']['text']
        except KeyError:
            return await self.throw_missed_field(event=event['event'])

        data, is_ok = await self.dialog_update_message(id, text)
        if is_ok:
            await self.channel_layer.group_send(
                'dialog_%d' % data.get('dialog'),
                {
                    'type': 'channels_message',
                    'event': event['event'],
                    'data': data
                }
            )
        else:
            await self._throw_error(
                {
                    'detail': 'Message doesn\'t exist'
                },
                event=event
            )

    @database_sync_to_async
    def dialog_send_message(self, id, text):
        """ Create message in Database """
        new_message = DialogMessage.objects.create(
            sender_id=self.user.id,
            dialog_id=id,
            text=text,
            date=datetime.now()
        )
        new_message.save()
        serialized = DialogMessageSerializer(new_message)
        return serialized.data

    @database_sync_to_async
    def dialog_delete_message(self, id):
        """ Delete message in Database """
        try:
            message = DialogMessage.objects.get(id=id)
            message.delete()
            return (
                {
                    'dialog_id': message.dialog.id,
                    'message_id': id
                }, True
            )
        except ObjectDoesNotExist:
            return {'detail': 'Message doesn\'t exist'}, False

    @database_sync_to_async
    def dialog_update_message(self, id, text):
        """ Update message in Database """
        try:
            message = DialogMessage.objects.get(id=id)
            message.text = text
            message.save()
            serialized = DialogMessageSerializer(message)
            return (
                serialized.data, True
            )
        except ObjectDoesNotExist:
            return {'detail': 'Message doesn\'t exist'}, False

    @database_sync_to_async
    def dialog_create(self, id):
        """ Create Dialog room in Database """
        try:
            Dialog.check_unique_dialog_members(self.user.id, id)
        except ValidationError as e:
            return {'detail': str(e.message)}, None, False

        new_dialog = Dialog.objects.create()
        m2 = DialogMembership.objects.create(
            dialog=new_dialog,
            person_id=self.user.id
        )
        m1 = DialogMembership(
            dialog=new_dialog,
            person_id=id
        )
        try:
            m1.save_base()
            m2.save_base()
        except ValidationError as e:
            return {'detail': str(e.message)}, None, False

        data1 = DialogSerializer(
            new_dialog,
            context={'user_id': self.user.id}
        ).data
        data2 = DialogSerializer(
            new_dialog,
            context={'user_id': id}
        ).data
        return (
            {
                self.user.id: data1,
                id: data2
            },
            new_dialog.id,
            True
        )

    @database_sync_to_async
    def delete_dialog(self, id):
        """ Delete dialog in Databese """
        try:
            dialog = Dialog.objects.get(id=id)
            dialog.delete()
            return ({'dialog_id': id}, True)
        except ObjectDoesNotExist:
            return {'detail': 'Dialog doesn\'t exist'}, False
