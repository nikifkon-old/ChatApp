from backend.socket_chat.consumers.base import BaseConsumer
from channels.db import database_sync_to_async

from backend.profiles.models import Profile
from backend.socket_chat.consumers.dialog import DialogConsumer


class MainConsumer(DialogConsumer, BaseConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.dialogs = []
        self._groups = []

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
            print('connecting %s to %s' % (self.user.id, room))
            print(room_data, room)
            await self.channel_layer.group_add(room, self.channel_name)

            await self._send_message(room_data[self.user.id], event=event)

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

    async def disconnect(self, *args, **kwargs):
        """ Discard from all channels """
        if self.dialogs:
            for dialog in self.dialogs:
                await self.channel_layer.group_discard(
                    f'dialog_{dialog}',
                    self.channel_name
                )
        if self._groups:
            for group in self._groups:
                await self.channel_layer.group_discard(
                    f'group_{group}',
                    self.channel_name
                )

    @database_sync_to_async
    def get_user_channels(self, user):
        """ Get all user's dialogs & groups id """
        profile = Profile.objects.get(user=user)
        for dialog in profile.dialogs.values():
            self.dialogs.append(dialog.get('id'))
        for group in profile.groups.values():
            self._groups.append(group.get('id'))
