from channels.db import database_sync_to_async

from backend.socket_chat.mixins.events import EventsMixin
from backend.dialogs.models import (
    DialogMessage,
    Dialog,
    DialogMembership,
    DialogMessageInfo,
)
from backend.api.v1.dialogs.serializers import (
    DialogMessageSerializer,
    DialogSerializer,
)


class DialogEvents(EventsMixin):
    def __init__(self, *args, **kwargs):
        self.setup(Meta)
        super().__init__(*args, **kwargs)

    async def event_dialog_messages_setasread(self, event):
        try:
            messages = event['data']['list']
        except KeyError:
            return await self.throw_missed_field(event=event['event'])
        await self.set_as_read_dialog_messsages(messages)

    @database_sync_to_async
    def set_as_read_dialog_messsages(self, messages):
        for message in messages:
            info = DialogMessageInfo.objects.get(
                person=self.user.id,
                message__id=message['message_id']
            )
            info.unread = False
            info.save()

class Meta:
    name = 'dialog'
    name_plural = 'dialogs'
    chat_model = Dialog
    chat_serializer = DialogSerializer
    chat_membership = DialogMembership
    message_model = DialogMessage
    message_serializer = DialogMessageSerializer
    message_info_model = DialogMessageInfo
