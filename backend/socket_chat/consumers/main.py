from backend.socket_chat.consumers.base import BaseConsumer
from channels.db import database_sync_to_async

from backend.profiles.models import Profile
from backend.socket_chat.consumers.dialog import DialogConsumer


class MainConsumer(DialogConsumer, BaseConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.dialogs = []
        self.groups = []

    async def channels_message(self, message):
        """ Redirect Group messages to each person """
        await self._send_message(message['data'], event=message['type'])

    async def on_authenticate_success(self):
        """ Execute after user authenticate """
        await self.get_user_channels(self.user)

        for dialog in self.dialogs:
            await self.channel_layer.group_add(f'dialog_{dialog}', self.channel_name)

        for group in self.groups:
            await self.channel_layer.group_add(f'group_{group}', self.channel_name)

    @database_sync_to_async
    def get_user_channels(self, user):
        """ Get all user's dialogs & groups id """
        profile = Profile.objects.get(user=user)
        for dialog in profile.dialogs.values():
            self.dialogs.append(dialog.get('id'))
        for group in profile.groups.values():
            self.groups.append(group.get('id'))
