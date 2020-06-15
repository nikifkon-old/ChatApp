from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from channels.db import database_sync_to_async
from asgiref.sync import async_to_sync

from backend.api.v1.groups.serializers import GroupSerializer, LastMessageSerializer, GroupMessageSerializer, MemberSerializer
from backend.groups.models import ChatGroup, GroupMessage, GroupMessageInfo, GroupMembership
from backend.groups.forms import GroupForm, GroupMessageForm, GroupMembershipForm
from backend.socket_chat.mixins.view import ChatViewMixin


User = get_user_model()


class GroupView(ChatViewMixin):
    class Meta:
        chat_model = ChatGroup
        chat_serializer = GroupSerializer
        chat_form = GroupForm
        chat_message_model = GroupMessage
        chat_message_serializer = GroupMessageSerializer
        chat_message_form = GroupMessageForm
        chat_membership_model = GroupMembership
        chat_message_info_model = GroupMessageInfo
        last_message_serializer = LastMessageSerializer
        chat_name = "group"

    @database_sync_to_async
    def get(self, id_: int, with_messages: bool = False, filter_: str = None, user_id: int = None) -> dict:
        if user_id is None:
            user_id = self.user_id
        data = async_to_sync(super().get)(id_, with_messages, filter_, user_id)

        group = ChatGroup.objects.get(id=id_)
        members = self._get_members(group)
        data["members"] = MemberSerializer(members, many=True).data

        return data

    def _get_members(self, group: ChatGroup) -> dict:
        return GroupMembership.objects.filter(group=group)

    @database_sync_to_async
    def create(self, name: str, slug: str, description: str = None) -> (dict, bool):
        user = User.objects.get(id=self.user_id)
        group_data = {
            "members": [user],
            "name": name,
            "slug": slug,
            "description": description
        }
        form = GroupForm(group_data)
        if form.is_valid():
            group = form.save()
            data = async_to_sync(self.get)(group.id)
            return data, True
        else:
            return {"detail": form.errors["__all__"][0]}, False

    @database_sync_to_async
    def join(self, group_id: int = None, slug: str = None, user_id: int = None) -> (dict, bool):
        if user_id is None:
            user_id = self.user_id
        try:
            if slug is not None:
                group = ChatGroup.objects.get(slug=slug)
            elif group_id is not None:
                group = ChatGroup.objects.get(id=group_id)
        except ObjectDoesNotExist:
            return {"detail": "Group with given slug or id does not exist"}, False
        form_data = {
            "group": group.id,
            "person": user_id,
            "role": "S"
        }
        form = GroupMembershipForm(form_data)
        if form.is_valid():
            form.save()
            data = async_to_sync(self.get)(group.id)
            return data, True
        else:
            return {"detail": form.errors["__all__"][0]}, False
