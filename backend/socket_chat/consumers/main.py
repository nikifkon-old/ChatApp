import jwt
from channels.db import database_sync_to_async
from django.conf import settings
from django.contrib.auth import get_user_model
from jwt import DecodeError

from backend.socket_chat.consumers.dialog import DialogEvents
from backend.socket_chat.consumers.group import GroupEvents
from backend.socket_chat.consumers.base import BaseConsumer


User = get_user_model()


class MainConsumer(BaseConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.dialog_events = DialogEvents(self)
        self.group_events = GroupEvents(self)

    async def receive_json(self, content, **kwargs):
        """ Event management """
        message = await self.parse_content(content)
        if message:
            event = message['event'].split('.')
            type_ = event.pop(0)
            action = '_'.join(event)

            if type_ == "authenticate":
                await self.event_authenticate(message)
            elif type_ == "dialog":
                method = getattr(self.dialog_events, f'event_{action}', self.method_unedefined)
                await method(message)
            elif type_ == "group":
                method = getattr(self.group_events, f'event_{action}', self.method_unedefined)
                await method(message)
            else:
                await self.method_unedefined(message)

        else:
            await self._throw_error({'detail': 'Invalid format'})

    async def event_authenticate(self, message):
        """ User Authorization """
        token = message['data'].get('access_token')
        if token is not None:
            try:
                data = jwt.decode(token, settings.SECRET_KEY)
            except DecodeError:
                return await self._throw_error({'detail': 'Token is not valid'},
                                               event=message['event'])

            user = User.objects.get(id=data['user_id'])
            self.user = user
            self.dialog_events.view.set_user_id(user.id)
            self.group_events.view.set_user_id(user.id)

            if getattr(self, 'on_authenticate_success'):
                await self.on_authenticate_success()
            await self._send_message({'detail': 'Authorization successed'},
                                     event=message['event'])
        else:
            await self._throw_error({'detail': 'Access token must not be empty'},
                                    event=message['event'])

    async def on_authenticate_success(self):
        """ Execute after user authenticate """
        await self.get_user_channels()
        await self.channel_layer.group_add('general', self.channel_name)
        # connect to channel for all groups
        if self.dialogs:
            for dialog in self.dialogs:
                await self.channel_layer.group_add(f'dialog_{dialog}',
                                                   self.channel_name)
        if self._groups:
            for group in self._groups:
                await self.channel_layer.group_add(f'group_{group}',
                                                   self.channel_name)

    # channel layer message types:
    async def channels_message(self, message):
        """ Redirect Group messages to each person """
        await self._send_message(message['data'], event=message['event'])

    async def connect_users(self, message):
        """ Connect user to rooms """
        users = message['data']['users']
        room = message['data']['room']
        room_data = message['data']['room_data']
        event = message['event']

        if self.user.id in users:
            await self.channel_layer.group_add(room, self.channel_name)
            await self._send_message(room_data[self.user.id], event=event)

    async def method_unedefined(self, message):
        await self._throw_error({'detail': 'Undefined event'},
                                event=message['event'])

    @database_sync_to_async
    def get_user_channels(self):
        """ Get all user's dialogs & groups id """
        for dialog in self.user.dialogs.values():
            self.dialogs.append(dialog.get('id'))
        for group in self.user.groups.values():
            self._groups.append(group.get('id'))
