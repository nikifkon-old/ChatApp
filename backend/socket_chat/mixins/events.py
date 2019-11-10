from django.core.exceptions import (
    ValidationError,
)
from django.utils.translation import gettext_lazy as _

from backend.socket_chat.consumers.base import BaseConsumer, private
from backend.socket_chat.mixins.chat_db import EventsDBMixin

class EventsMixin(EventsDBMixin, BaseConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def setup(self, MetaData):
        try:
            getattr(MetaData, 'name')
            MetaData.name_plural = MetaData.name + 's'
        except AttributeError:
            raise ValidationError(_('missed attribute "name" required in Meta class'))
        
        setattr(self, 'event_%s_list' % MetaData.name_plural, self.build(self.list, MetaData))
        setattr(self, 'event_%s_get' % MetaData.name, self.build(self.get, MetaData))
        setattr(self, 'event_%s_create' % MetaData.name, self.build(self.create, MetaData))
        setattr(self, 'event_%s_delete' % MetaData.name, self.build(self.delete, MetaData))
        setattr(self, 'event_%s_message_send' % MetaData.name, self.build(self.message_send, MetaData))
        setattr(self, 'event_%s_message_delete' % MetaData.name, self.build(self.message_delete, MetaData))
        setattr(self, 'event_%s_message_update' % MetaData.name, self.build(self.message_update, MetaData))

    def build(self, method, MetaData):
        def withMeta(_self, *args, **kwargs):
            method.__self__.Meta = MetaData
            return method(_self, *args, **kwargs)
        return withMeta

    @private
    async def list(self, event):
        """ get list """
        try:
            filter = event.get('data').get('filter')
        except KeyError:
            return await self.throw_missed_field(event=event['event'])
        data = await self.get_list(self.user.id, filter)
        await self._send_message(data, event=event['event'])

    @private
    async def get(self, event):
        """ get chat by id """
        try:
            id = event.get('data')['id']
            filter = event.get('data').get('filter')
        except KeyError:
            return await self.throw_missed_field(event=event['event'])
        data = await self.get_messages(id, self.user.id, filter)
        await self._send_message(data, event=event['event'])
    
    @private
    async def create(self, event):
        """ create chat """
        try:
            id = int(event.get('data')['id'])
        except KeyError:
            return await self.throw_missed_field(event=event['event'])
        data, is_ok = await self.create_chat(id)
        if is_ok:
            users = [self.user.id, id]
            chat_id = data[next(iter(data))].get('id')
            room = '%s_%d' % (self.Meta.name, chat_id)

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
            await self._throw_error(data, event=event['event'])

    @private
    async def delete(self, event):
        """ delete chat """
        try:
            id = event['data']['id']
        except KeyError:
            return await self.throw_missed_field(event=event['event'])
        data, is_ok = await self.delete(id)
        if is_ok:
            room = '%s_%d' % (self.Meta.name, id)
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
            id = int(event['data']['id'])
            text = event['data']['text']
        except KeyError:
            return await self.throw_missed_field(event=event['event'])

        new_message = await self.send_message(id, text)
        room = '%s_%s' % (self.Meta.name, id)
        await self.channel_layer.group_send(room, {
            'type': 'channels_message',
            'event': event['event'],
            'data': new_message
        })

    @private
    async def message_delete(self, event):
        """ delete message """
        try:
            id = event['data']['id']
        except KeyError:
            return await self.throw_missed_field(event=event['event'])

        data, is_ok = await self.delete_message(id)
        if is_ok:
            room = '%s_%d' % (self.Meta.name, data.get('chat_id'))
            await self.channel_layer.group_send(room, {
                    'type': 'channels_message',
                    'event': event['event'],
                    'data': data
                }
            )
        else:
            await self._throw_error(
                data,
                event=event['event']
            )

    @private
    async def message_update(self, event):
        """ update messages """
        try:
            id = event['data']['id']
            text = event['data'].get('text')
            stared = event['data'].get('stared')
            unread = event['data'].get('unread')
        except KeyError:
            return await self.throw_missed_field(event=event['event'])

        data, is_ok = await self.update_message(
            id, 
            text=text,
            stared=stared,
            unread=unread
        )
        if is_ok:
            room = '%s_%d' % (self.Meta.name, data.get('chat_id'))
            await self.channel_layer.group_send(room, {
                    'type': 'channels_message',
                    'event': event['event'],
                    'data': data
                }
            )
        else:
            await self._throw_error(
                data,
                event=event['event']
            )
    