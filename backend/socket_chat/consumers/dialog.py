from backend.socket_chat.consumers.base import private
from backend.socket_chat.consumers.dialog_db import DialogDataBase


class DialogConsumer(DialogDataBase):
    @private
    async def event_dialogs_list(self, event):
        """ Handle dialogs.list """
        try:
            filter = event.get('data').get('filter')
        except KeyError:
            return await self.throw_missed_field(event=event['event'])
        data = await self.get_dialog_list(self.user.id, filter)
        await self._send_message(data, event=event['event'])

    @private
    async def event_dialog_get(self, event):
        """ Handle dialog.get """
        try:
            id = event.get('data')['id']
            filter = event.get('data').get('filter')
        except KeyError:
            return await self.throw_missed_field(event=event['event'])
        data = await self.get_dialog_messages(id, self.user.id, filter)
        await self._send_message(data, event=event['event'])

    @private
    async def event_dialog_create(self, event):
        """ Handle dialog.create """
        try:
            id = int(event['data']['id'])
        except KeyError:
            return await self.throw_missed_field(event=event['event'])
        data, dialog_id, is_ok = await self.create_dialog(id)
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

        new_message = await self.send_dialog_message(id, text)
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

        data, is_ok = await self.delete_dialog_message(id)
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
            text = event['data'].get('text')
            stared = event['data'].get('stared')
            unread = event['data'].get('unread')
        except KeyError:
            return await self.throw_missed_field(event=event['event'])

        data, is_ok = await self.update_dialog_message(id, text=text, stared=stared, unread=unread)
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
