from datetime import datetime
from channels.db import database_sync_to_async

from backend.api.v1.chat_messages.serializers import DialogMessageSerializer
from backend.chat_messages.models import DialogMessage
from backend.socket_chat.consumers.base import BaseConsumer, private


class ChatConsumer(BaseConsumer):
    async def connect(self):
        await super().connect()
        await self.channel_layer.group_add("websocket", self.channel_name)
        self.dialog_id = self.scope['url_route']['kwargs']['dialog_id']

    @private
    async def event_send_message(self, event):
        try:
            data = await self.send_message(event['data']['text'])
            await self.channel_layer.group_send("websocket", {
                'type': 'message',
                'data': data
            })
        except:
            await self._throw_error({'detail': 'Invalid Format'}, event=event['event'])

    async def message(self, message):
        await self._send_message(message['data'], event=message['type'])

    @database_sync_to_async
    def send_message(self, text):
        new_message = DialogMessage.objects.create(
            sender_id=self.user.id,
            dialog_id=self.dialog_id,
            text=text,
            date=datetime.now()
        )
        new_message.save()
        serialized = DialogMessageSerializer(new_message)
        return serialized.data
