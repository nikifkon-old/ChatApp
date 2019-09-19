from channels.db import database_sync_to_async

from backend.dialogs.models import Dialog
from backend.socket_chat.consumers.base import BaseConsumer


class ChatConsumer(BaseConsumer):
    async def connect(self):
        await super().connect()
        await self.channel_layer.group_add("websocket", self.channel_name)
        self.dialog_id = self.scope['url_route']['kwargs']['dialog_id']
