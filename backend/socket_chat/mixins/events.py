def private(event):
    """ Provide private event with user objects """
    async def must_auth(self, message, *args, **kwargs):
        user = self.consumer.user
        if user:
            return await event(self, message, *args, **kwargs)
        else:
            await self.consumer.throw_must_authenticate(message['event'])
    return must_auth


class EventsMixin():
    def __init__(self, consumer):
        self.consumer = consumer
        self.view = self.Meta.view()
        super().__init__()

    @private
    async def event_list(self, event):
        """ get list """
        try:
            filter_ = event.get('data').get('filter')
        except KeyError:
            return await self.consumer.throw_missed_field(event=event['event'])
        data = await self.view.list(filter_=filter_)
        await self.consumer._send_message(data, event=event['event'])

    @private
    async def event_get(self, event):
        """ get chat by id """
        try:
            id_ = event.get('data')['id']
            filter_ = event.get('data').get('filter')
        except KeyError:
            return await self.consumer.throw_missed_field(event=event['event'])
        data = await self.view.get(id_, with_messages=True, filter_=filter_)
        await self.consumer._send_message(data, event=event['event'])

    @private
    async def event_create(self, event):
        """ create chat """
        try:
            id_ = int(event.get('data')['id'])
        except KeyError:
            return await self.consumer.throw_missed_field(event=event['event'])
        data, created = await self.view.create(id_)
        if created:
            users = [self.consumer.user.id, id_]
            chat_id = data.get('chat_id')
            room = '%s_%d' % (self.Meta.name, chat_id)

            await self.consumer.channel_layer.group_send('general', {
                'type': 'connect_users',
                'event': event['event'],
                'data': {
                    'users': users,
                    'room': room,
                    'room_data': data
                }
            })
        else:
            await self.consumer._throw_error(data, event=event['event'])

    @private
    async def event_delete(self, event):
        """ delete chat """
        try:
            id_ = event['data']['id']
        except KeyError:
            return await self.consumer.throw_missed_field(event=event['event'])
        data, deleted = await self.view.delete(id_)
        if deleted:
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

        new_message, sended = await self.view.send_message(id_, text)
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

        data, deleted = await self.view.delete_message(id_)
        if deleted:
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

        data, updated = await self.view.update_message(id_, text)
        if updated:
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
        await self.view.set_as_read(messages)

    @private
    async def event_message_star(self, event):
        """ star/unstar message """
        try:
            stared = event['data']['stared']
            message_id = event['data']['id']
        except KeyError:
            return await self.consumer.throw_missed_field(event=event['event'])
        data, stared = await self.view.star_message(message_id, stared)
        if stared:
            await self.consumer._send_message(data, event=event['event'])
        else:
            await self.consumer._throw_error(data, event=event['event'])
