from backend.api.v1.groups.serializers import GroupMessageSerializer, GroupSerializer
from backend.groups.views import GroupView
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
        view = GroupView

    @private
    async def event_create(self, event):
        try:
            name = event['data']['name']
            slug = event['data']['slug']
            description = event['data'].get('description')
        except KeyError:
            return await self.consumer.throw_missed_field(event=event['event'])
        data, created = await self.view.create(
            name=name,
            slug=slug,
            description=description,
        )
        if created:
            users = [self.consumer.user.id]
            room = '%s_%d' % (self.Meta.name, data['id'])
            room_data = {self.consumer.user.id: data}
            await self.consumer.channel_layer.group_send('general', {
                'type': 'connect_users',
                'event': event['event'],
                'data': {
                    'users': users,
                    'room': room,
                    'room_data': room_data
                }
            })
        else:
            await self.consumer._throw_error(data, event=event['event'])

    @private
    async def event_join(self, event):
        group_id = event['data'].get('id')
        slug = event['data'].get('slug')
        if not (group_id or slug):
            return await self.consumer.throw_missed_field(event=event['event'])
        data, joined = await self.view.join(group_id=group_id, slug=slug)
        if joined:
            users = [self.consumer.user.id]
            room = '%s_%d' % (self.Meta.name, data["id"])
            room_data = {
                self.consumer.user.id: data
            }

            await self.consumer.channel_layer.group_send('general', {
                'type': 'connect_users',
                'event': event['event'],
                'data': {
                    'users': users,
                    'room': room,
                    'room_data': room_data
                }
            })
        else:
            await self.consumer._throw_error(data, event=event['event'])
