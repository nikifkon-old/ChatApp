from channels.db import database_sync_to_async
from django.core.exceptions import ValidationError
from django.db import IntegrityError

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
        except KeyError:
            return await self.throw_missed_field(event=event['event'])
        data, created = await self.create_group(
            name=name,
            slug=slug,
            description=description,
        )
        if created:
            users = [self.user.id]
            room = '%s_%d' % (Meta.name, data['id'])
            room_data = {self.user.id: data}
            await self.channel_layer.group_send('general', {
                'type': 'connect_users',
                'event': event['event'],
                'data': {
                    'users': users,
                    'room': room,
                    'room_data': room_data
                }
            })
        else:
            await self._throw_error(data, event=event['event'])

    @database_sync_to_async
    def create_group(self, name, slug, description=None):
        try:
            group = ChatGroup.objects.create(
                name=name,
                slug=slug,
                description=description,
            )
        except (IntegrityError, ValidationError) as error:
            if isinstance(error, IntegrityError):
                message = 'slug - `%s` has already taken' % slug
            elif isinstance(error, ValidationError):
                message = error.message
            return {'detail': message}, False
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
