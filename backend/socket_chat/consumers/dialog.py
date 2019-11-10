from backend.socket_chat.mixins.chat import ChatConsumerMixin
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

class DialogConsumer(ChatConsumerMixin):
    def __init__(self, *args, **kwargs):
        self.setup(Meta)
        super().__init__(*args, **kwargs)


class Meta:
    name = 'dialog'
    name_plural = 'dialogs'
    chat_model = Dialog
    chat_serializer = DialogSerializer
    chat_membership = DialogMembership
    message_model = DialogMessage
    message_serializer = DialogMessageSerializer
    message_info_model = DialogMessageInfo
