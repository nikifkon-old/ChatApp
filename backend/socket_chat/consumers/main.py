import jwt
from django.conf import settings
from django.contrib.auth.models import User
from channels.db import database_sync_to_async

from backend.profiles.models import Profile
from backend.socket_chat.consumers.dialog import DialogEvents
from backend.socket_chat.consumers.group import GroupEvents


class MainConsumer(GroupEvents, DialogEvents):
    async def receive_json(self, content):
        """ Event managment """
        message = await self.parse_content(content)
        if message:
            event = message['event'].replace('.', '_')
            method = getattr(self, f'event_{event}', self.method_unedefined)
            await method(message)
        else:
            await self._throw_error({'detail': 'Invalid format'})
    
    async def event_authenticate(self, message):
        """ User Authorization """
        try:
            token = message['data']['access_token']
            data = jwt.decode(token, settings.SECRET_KEY)
            user = User.objects.get(id=data['user_id'])
            self.user = user
            await self._send_message({'detail': 'Authorization successed'},
                                     event=message['event'])
            if getattr(self, 'on_authenticate_success'):
                await self.on_authenticate_success()
        except:
            await self._throw_error({'detail': 'Authorization failed'},
                                    event=message['event'])

    async def on_authenticate_success(self):
        """ Execute after user authenticate """
        await self.get_user_channels(self.user)
        await self.channel_layer.group_add('general', self.channel_name)
        # connect to channel for all groups
        if self.dialogs:
            for dialog in self.dialogs:
                await self.channel_layer.group_add(f'dialog_{dialog}', self.channel_name)
        if self._groups:
            for group in self._groups:
                await self.channel_layer.group_add(f'group_{group}', self.channel_name)

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

    @database_sync_to_async
    def get_user_channels(self, user):
        """ Get all user's dialogs & groups id """
        profile = Profile.objects.get(user=user)
        for dialog in profile.dialogs.values():
            self.dialogs.append(dialog.get('id'))
        for group in profile.groups.values():
            self._groups.append(group.get('id'))
