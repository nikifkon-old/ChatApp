from backend.socket_chat.mixins.events_db import EventsDBMixin


def private(event):
    """ Provide private event with user objects """
    async def must_auth(self, message, *args, **kwargs):
        user = self.consumer.user
        if user:
            return await event(self, message, *args, **kwargs)
        else:
            await self.consumer.throw_must_authenticate(message['event'])
    return must_auth


class EventsMixin(EventsDBMixin):
    def __init__(self, consumer):
        self.consumer = consumer
        super().__init__()

    @private
    async def event_list(self, event):
        """ get list """
        try:
            filter_ = event.get('data').get('filter')
        except KeyError:
            return await self.consumer.throw_missed_field(event=event['event'])
        data = await self.get_list(self.consumer.user.id, filter_)
        await self.consumer._send_message(data, event=event['event'])

    @private
    async def event_get(self, event):
        """ get chat by id """
        try:
            id_ = event.get('data')['id']
            filter_ = event.get('data').get('filter')
        except KeyError:
            return await self.consumer.throw_missed_field(event=event['event'])
        data = await self.get_messages(id_, self.consumer.user.id, filter_)
        await self.consumer._send_message(data, event=event['event'])

    @private
    async def event_create(self, event):
        """ create chat """
        try:
            id_ = int(event.get('data')['id'])
        except KeyError:
            return await self.consumer.throw_missed_field(event=event['event'])
        room_data, is_ok = await self.create_chat(id_)
        if is_ok:
            users = [self.consumer.user.id, id_]
            chat_id = room_data.get('chat_id')
            room = '%s_%d' % (self.Meta.name, chat_id)

            await self.consumer.channel_layer.group_send('general', {
                'type': 'connect_users',
                'event': event['event'],
                'data': {
                    'users': users,
                    'room': room,
                    'room_data': room_data
                }
            })
        else:
            await self.consumer._throw_error(room_data, event=event['event'])

    @private
    async def event_delete(self, event):
        """ delete chat """
        try:
            id_ = event['data']['id']
        except KeyError:
            return await self.consumer.throw_missed_field(event=event['event'])
        data, is_ok = await self.delete_chat(id_)
        if is_ok:
            room = '%s_%d' % (self.Meta.name, id_)
            await self.consumer.channel_layer.group_send(room, {
                'type': 'channels_message',
                'event': event['event'],
                'data': data
            })
        else:
            await self.consumer._throw_error(
                data,
                event=event['event']
            )

    @private
    async def event_message_send(self, event):
        """ send message """
        try:
            id_ = int(event['data']['id'])
            text = event['data']['text']
        except KeyError:
            return await self.consumer.throw_missed_field(event=event['event'])

        new_message = await self.send_message(id_, text)
        room = '%s_%s' % (self.Meta.name, id_)
        await self.consumer.channel_layer.group_send(room, {
            'type': 'channels_message',
            'event': event['event'],
            'data': new_message
        })

    @private
    async def event_message_delete(self, event):
        """ delete message """
        try:
            id_ = event['data']['id']
        except KeyError:
            return await self.consumer.throw_missed_field(event=event['event'])

        data, is_ok = await self.delete_message(id_)
        if is_ok:
            room = '%s_%d' % (self.Meta.name, data.get('chat_id'))
            await self.consumer.channel_layer.group_send(room, {
                'type': 'channels_message',
                'event': event['event'],
                'data': data
            })
        else:
            await self.consumer._throw_error(
                data,
                event=event['event']
            )

    @private
    async def event_message_update(self, event):
        """ update messages """
        try:
            id_ = event['data']['id']
            text = event['data'].get('text')
        except KeyError:
            return await self.consumer.throw_missed_field(event=event['event'])

        data, is_ok = await self.update_message(
            id_,
            text=text,
        )
        if is_ok:
            room = '%s_%d' % (self.Meta.name, data.get('chat_id'))
            await self.consumer.channel_layer.group_send(room, {
                'type': 'channels_message',
                'event': event['event'],
                'data': data
            })
        else:
            await self.consumer._throw_error(
                data,
                event=event['event']
            )

    @private
    async def event_messages_setasread(self, event):
        """ set as read messages """
        try:
            messages = event['data']['list']
        except KeyError:
            return await self.consumer.throw_missed_field(event=event['event'])
        await self.set_as_read(messages)

    @private
    async def event_message_star(self, event):
        """ star/unstar message """
        try:
            stared = event['data']['stared']
            id = event['data']['id']
        except KeyError:
            return await self.consumer.throw_missed_field(event=event['event'])
        data, is_ok = await self.star_message(id=id, stared=stared)
        if is_ok:
            await self.consumer._send_message(data, event=event['event'])
        else:
            await self.consumer._throw_error(data, event=event['event'])
