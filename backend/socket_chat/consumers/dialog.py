from backend.socket_chat.mixins.events import EventsMixin
from backend.dialogs.views import DialogView
from backend.dialogs.models import (
    DialogMessage,
    Dialog,
    DialogMembership,
    DialogMessageInfo,
)
from backend.api.v2.dialogs.serializers import (
    DialogMessageSerializer,
    DialogSerializer,
)


class DialogEvents(EventsMixin):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.consumer.need_unread_check_events.append("dialog.message.send")

    class Meta:
        name = 'dialog'
        chat_model = Dialog
        chat_serializer = DialogSerializer
        chat_membership = DialogMembership
        message_model = DialogMessage
        message_serializer = DialogMessageSerializer
        message_info_model = DialogMessageInfo
        view = DialogView
