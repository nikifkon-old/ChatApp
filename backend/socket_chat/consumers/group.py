from channels.db import database_sync_to_async
from django.core.exceptions import ValidationError
from django.db import IntegrityError

from backend.api.v1.groups.serializers import (GroupMessageSerializer,
                                               GroupSerializer)
from backend.groups.models import (ChatGroup, GroupMembership, GroupMessage,
                                   GroupMessageInfo)
from backend.socket_chat.mixins.events import EventsMixin, private


class GroupEvents(EventsMixin):
    class Meta:
        name = 'group'
        chat_model = ChatGroup
        chat_serializer = GroupSerializer
        chat_membership = GroupMembership
        message_model = GroupMessage
        message_serializer = GroupMessageSerializer
        message_info_model = GroupMessageInfo

    @private
    async def event_create(self, event):
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
            users = [self.consumer.user.id]
            room = '%s_%d' % (self.Meta.name, data['id'])
            room_data = {self.consumer.user.id: data}
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
        GroupMembership.objects.create(
            group=group,
            person_id=self.consumer.user.id,
            role="A"
        )
        serialized = GroupSerializer(
            group,
            context={
                "user_id": self.consumer.user.id
            }
        )
        return serialized.data, True
