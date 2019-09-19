from channels.db import database_sync_to_async

from backend.dialogs.models import Dialog
from backend.socket_chat.consumers.base import BaseConsumer


class ChatConsumer(BaseConsumer):
    async def connect(self):
        await self.channel_layer.group_add("websocket", self.channel_name)

    async def receive_json(self, content):
        text = content["text"]
        # await self.send_json(content={
        #     "text": text
        # })
        await self.channel_layer.group_send("websocket", {
            "type": "websocket.message",
            "text": text
        })
        # await self.channel_layer.group_send("websocket", {})

    # async def receive(self, text_data):
    #     dialogs = await self.get_dialogs()
    #
    #     await self.channel_layer.group_send("websocket",{
    #         "type": "websocket.message",
    #         "text": text_data
    #     })

    async def websocket_message(self, event):
        await self.send(text_data=event['text'])

    async def disconnect(self, message):
        print(message)

    @database_sync_to_async
    def get_dialogs(self):
        return Dialog.objects.all()
