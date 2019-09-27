from datetime import datetime
from channels.db import database_sync_to_async
from django.core.exceptions import ObjectDoesNotExist
from backend.api.v1.chat_messages.serializers import DialogMessageSerializer
from backend.chat_messages.models import DialogMessage
from backend.socket_chat.consumers.base import BaseConsumer, private


class DialogConsumer(BaseConsumer):
    @private
    async def event_dialog_send(self, event):
        """ Handle dialog.send event """
        try:
            id = event['data']['id']
            text = event['data']['id']
        except KeyError:
            await self.throw_missed_field(event=event)

        new_message = await self.dialog_send_message(id, text)
        await self.channel_layer.group_send(f'dialog_{id}', {
            "type": "channels_message",
            "event": event['event'],
            "data": new_message
        })

    @private
    async def event_dialog_delete(self, event):
        """ Handle dialog.delete event """
        try:
            id = event['data']['id']  # message id
        except KeyError:
            await self.throw_missed_field(event=event)

        details = await self.dialog_delete_message(event['data']['id'])
        await self.channel_layer.group_send(f'dialog_{id}', {
            'type': 'channels_message',
            "event": event['event'],
            'data': details
        })

    @private
    async def event_dialog_update(self, event):
        """ Handle dialog.update event """
        try:
            id = event['data']['id']
            text = event['data']['id']
        except KeyError:
            await self.throw_missed_field(event=event)

        message = await self.dialog_update_message(id, text)
        await self.channel_layer.group_send("websocket", {
            'type': 'channels_message',
            "event": event['event'],
            'data': message
        })

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
            DialogMessage.objects.get(id=id).delete()
            return {'detail': 'Deleting successed'}
        except ObjectDoesNotExist:
            return {'detail': 'Message doesn\'t exist'}

    @database_sync_to_async
    def dialog_update_message(self, id, text):
        """ Update message in Database """
        try:
            message = DialogMessage.objects.get(id=id)
            message.text = text
            message.save()
            serialized = DialogMessageSerializer(message)
            return serialized.data
        except ObjectDoesNotExist:
            return {'detail': 'Message doesn\'t exist'}
