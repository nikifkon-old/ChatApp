from backend.socket_chat.mixins.chat import ChatConsumerMixin
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

class GroupConsumer(ChatConsumerMixin):
    class Meta:
        name = 'group'
        name_plural = 'groups'
        chat_model = ChatGroup
        chat_serializer = GroupSerializer
        chat_membership = GroupMembership
        message_model = GroupMessage
        message_serializer = GroupMessageSerializer
        message_info_model = GroupMessageInfo
