from django.core.exceptions import (
    ValidationError,
)
from django.utils.translation import gettext_lazy as _

from backend.socket_chat.consumers.base import BaseConsumer, private
from backend.socket_chat.mixins.chat_db import ChatDBMixin

class ChatConsumerMixin(BaseConsumer, ChatDBMixin):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        try:
            getattr(self.Meta, 'name')
            if self.Meta.name_plural is None:
                self.Meta.name_plural = self.Meta.name + 's'
        except AttributeError:
            raise ValidationError(_('missed attribute "name" required in Meta class'))
        
        setattr(self, 'event_%s_list' % self.Meta.name_plural, self.list)
        setattr(self, 'event_%s_get' % self.Meta.name, self.get)
        setattr(self, 'event_%s_create' % self.Meta.name, self.create)
        setattr(self, 'event_%s_delete' % self.Meta.name, self.delete)
        setattr(self, 'event_%s_message_send' % self.Meta.name, self.message_send)
        setattr(self, 'event_%s_message_delete' % self.Meta.name, self.message_delete)
        setattr(self, 'event_%s_message_update' % self.Meta.name, self.message_update)


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
    