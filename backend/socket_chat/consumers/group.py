from backend.socket_chat.mixins.events import EventsMixin
from backend.groups.models import (
    ChatGroup,
    GroupMembership,
    GroupMessage,
    GroupMessageInfo,
)
from backend.api.v1.groups.serializers import (
    GroupSerializer,
    GroupMessageSerializer,
)


class GroupEvents(EventsMixin):
    def __init__(self, *args, **kwargs):
        self.setup(Meta)
        super().__init__(*args, **kwargs)


class Meta:
    name = 'group'
    name_plural = 'groups'
    chat_model = ChatGroup
    chat_serializer = GroupSerializer
    chat_membership = GroupMembership
    message_model = GroupMessage
    message_serializer = GroupMessageSerializer
    message_info_model = GroupMessageInfo
