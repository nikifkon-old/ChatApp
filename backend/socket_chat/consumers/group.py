from channels.db import database_sync_to_async

from backend.socket_chat.consumers.base import private
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

    @private
    async def event_group_create(self, event):
        try:
            name = event['data']['name']
            slug = event['data']['slug']
            description = event['data'].get('description')
            img = event['data'].get('img')
        except KeyError:
            return await self.throw_missed_field(event=event['event'])
        data, created = await self.create_group(name=name, slug=slug, description=description, img=img)
        if created:
            await self._send_message(data, event=event['event'])

    @database_sync_to_async
    def create_group(self, name, slug, description=None, img=None):
        group = ChatGroup.objects.create(
            name=name,
            slug=slug,
            description=description,
            img=img
        )
        serialized = GroupSerializer(
            group,
            context={
                "user_id": self.user.id
            }
        )
        return serialized.data, True


class Meta:
    name = 'group'
    name_plural = 'groups'
    chat_model = ChatGroup
    chat_serializer = GroupSerializer
    chat_membership = GroupMembership
    message_model = GroupMessage
    message_serializer = GroupMessageSerializer
    message_info_model = GroupMessageInfo
