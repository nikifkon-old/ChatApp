from backend.socket_chat.consumers.mixin import ChatMixin
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

class DialogDataBase(ChatMixin):
    class Meta:
        chat_model = Dialog
        chat_serializer = DialogSerializer
        chat_membership = DialogMembership
        message_model = DialogMessage
        message_serializer = DialogMessageSerializer
        message_info_model = DialogMessageInfo
