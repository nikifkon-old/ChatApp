from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from backend.socket_chat.consumers.base import BaseConsumer, private
from backend.socket_chat.mixins.events_db import EventsDBMixin


class EventsMixin(EventsDBMixin, BaseConsumer):
    def setup(self, meta):
        try:
            getattr(meta, 'name')
            meta.name_plural = meta.name + 's'
        except AttributeError:
            raise ValidationError(_('missed attribute "name" required in Meta class'))
        
        self.setattr('event_%s_list' % meta.name_plural, self.build(self.list, meta))
        self.setattr('event_%s_get' % meta.name, self.build(self.get, meta))
        self.setattr('event_%s_create' % meta.name, self.build(self.create, meta))
        self.setattr('event_%s_delete' % meta.name, self.build(self.delete, meta))
        self.setattr('event_%s_message_send' % meta.name, self.build(self.message_send, meta))
        self.setattr('event_%s_message_delete' % meta.name, self.build(self.message_delete, meta))
        self.setattr('event_%s_message_update' % meta.name, self.build(self.message_update, meta))
        self.setattr('event_%s_messages_setasread' % meta.name, self.build(self.messages_setasread, meta))
        self.setattr('event_%s_message_star' % meta.name, self.build(self.message_star, meta))

    def setattr(self, name, method):
        if not hasattr(self, name):
            setattr(self, name, method)

    def build(self, method, meta):
        def with_meta(_self, *args, **kwargs):
            method.__self__.Meta = meta
            return method(_self, *args, **kwargs)
        return with_meta

    @private
    async def list(self, event):
        """ get list """
        try:
            filter_ = event.get('data').get('filter')
        except KeyError:
            return await self.throw_missed_field(event=event['event'])
        data = await self.get_list(self.user.id, filter_)
        await self._send_message(data, event=event['event'])

    @private
    async def get(self, event):
        """ get chat by id """
        try:
            id_ = event.get('data')['id']
            filter_ = event.get('data').get('filter')
        except KeyError:
            return await self.throw_missed_field(event=event['event'])
        data = await self.get_messages(id_, self.user.id, filter_)
        await self._send_message(data, event=event['event'])

    @private
    async def create(self, event):
        """ create chat """
        try:
            id_ = int(event.get('data')['id'])
        except KeyError:
            return await self.throw_missed_field(event=event['event'])
        room_data, is_ok = await self.create_chat(id_)
        if is_ok:
            users = [self.user.id, id_]
            chat_id = room_data.get('chat_id')
            room = '%s_%d' % (self.Meta.name, chat_id)

            await self.channel_layer.group_send('general', {
                'type': 'connect_users',
                'event': event['event'],
                'data': {
                    'users': users,
                    'room': room,
                    'room_data': room_data
                }
            })
        else:
            await self._throw_error(room_data, event=event['event'])

    @private
    async def delete(self, event):
        """ delete chat """
        try:
            id_ = event['data']['id']
        except KeyError:
            return await self.throw_missed_field(event=event['event'])
        data, is_ok = await self.delete_chat(id_)
        if is_ok:
            room = '%s_%d' % (self.Meta.name, id_)
            await self.channel_layer.group_send(room, {
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
    async def message_send(self, event):
        """ send message """
        try:
            id_ = int(event['data']['id'])
            text = event['data']['text']
        except KeyError:
            return await self.throw_missed_field(event=event['event'])

        new_message = await self.send_message(id_, text)
        room = '%s_%s' % (self.Meta.name, id_)
        await self.channel_layer.group_send(room, {
            'type': 'channels_message',
            'event': event['event'],
            'data': new_message
        })

    @private
    async def message_delete(self, event):
        """ delete message """
        try:
            id_ = event['data']['id']
        except KeyError:
            return await self.throw_missed_field(event=event['event'])

        data, is_ok = await self.delete_message(id_)
        if is_ok:
            room = '%s_%d' % (self.Meta.name, data.get('chat_id'))
            await self.channel_layer.group_send(room, {
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
    async def message_update(self, event):
        """ update messages """
        try:
            id_ = event['data']['id']
            text = event['data'].get('text')
        except KeyError:
            return await self.throw_missed_field(event=event['event'])

        data, is_ok = await self.update_message(
            id_,
            text=text,
        )
        if is_ok:
            room = '%s_%d' % (self.Meta.name, data.get('chat_id'))
            await self.channel_layer.group_send(room, {
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
    async def messages_setasread(self, event):
        """ set as read messages """
        try:
            messages = event['data']['list']
        except KeyError:
            return await self.throw_missed_field(event=event['event'])
        await self.set_as_read(messages)

    @private
    async def message_star(self, event):
        """ star/unstar message """
        try:
            star = event['data']['star']
            message_id = event['data']['message_id']
        except KeyError:
            return await self.throw_missed_field(event=event['event'])
        data, is_ok = await self.star_message(message_id=message_id, star=star)
        if is_ok:
            await self._send_message(data, event=event['event'])
        else:
            await self._throw_error(data, event=event['event'])
