from datetime import datetime
from channels.db import database_sync_to_async
from django.core.exceptions import ObjectDoesNotExist
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
        """ Handle send.message event """
        try:
            data = await self.send_message(event['data']['text'])
            await self.channel_layer.group_send("websocket", {
                'type': 'message',
                'data': data
            })
        except:
            await self._throw_error({'detail': 'Invalid Format'}, event=event['event'])

    @private
    async def event_delete_message(self, event):
        """ Handle delete.message event """
        try:
            details = await self.delete_message(event['data']['id'])
            await self.channel_layer.group_send("websocket", {
                'type': 'message',
                'data': details
            })
        except:
            await self._throw_error({'detail': 'Invalid Format'}, event=event['event'])

    @private
    async def event_update_message(self, event):
        """ Handle update.message event """
        try:
            message = await self.update_message(
                event['data']['id'],
                event['data']['text']
            )
            await self.channel_layer.group_send("websocket", {
                'type': 'message',
                'data': message
            })
        except:
            await self._throw_error({'detail': 'Invalid Format'}, event=event['event'])

    async def message(self, message):
        """ Redirect Group messages to each person """
        await self._send_message(message['data'], event=message['type'])

    @database_sync_to_async
    def send_message(self, text):
        """ Create message in Database """
        new_message = DialogMessage.objects.create(
            sender_id=self.user.id,
            dialog_id=self.dialog_id,
            text=text,
            date=datetime.now()
        )
        new_message.save()
        serialized = DialogMessageSerializer(new_message)
        return serialized.data

    @database_sync_to_async
    def delete_message(self, id):
        """ Delete message in Database """
        try:
            DialogMessage.objects.get(id=id).delete()
            return {'detail': 'Deleting successed'}
        except ObjectDoesNotExist:
            return {'detail': 'Message doesn\'t exist'}

    @database_sync_to_async
    def update_message(self, id, text):
        """ Update message in Database """
        try:
            message = DialogMessage.objects.get(id=id)
            message.text = text
            message.save()
            serialized = DialogMessageSerializer(message)
            return serialized.data
        except ObjectDoesNotExist:
            return {'detail': 'Message doesn\'t exist'}
