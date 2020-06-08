from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from channels.db import database_sync_to_async

from backend.api.v1.groups.serializers import GroupSerializer, GroupMessageSerializer, MemberSerializer
from backend.groups.models import ChatGroup, GroupMessage, GroupMessageInfo, GroupMembership
from backend.groups.forms import GroupForm, GroupMessageForm, GroupMembershipForm


User = get_user_model()


class GroupView:
    user_id = None

    def set_user_id(self, user_id: int):
        self.user_id = user_id

    def get(self, id_: int, with_messages: bool = False, filter_: str = None, user_id: int = None) -> dict:
        if user_id is None:
            user_id = self.user_id
        group = ChatGroup.objects.get(id=id_)
        data = GroupSerializer(group).data

        last_message = self._get_last_message(group)
        data["last_message"] = GroupMessageSerializer(last_message).data

        data["unread_count"] = self._get_unread_count(group, user_id=user_id)

        members = self._get_members(group)
        data["members"] = MemberSerializer(members, many=True).data

        messages = []
        if with_messages:
            messages = group.messages.all()
            # do filtering
            messages = GroupMessageSerializer(messages, many=True).data
        data["messages"] = self._get_serialized_message(messages, many=True, user_id=user_id)
        return data

    def _get_last_message(self, group: ChatGroup) -> GroupMessage:
        return group.messages.last()

    def _get_unread_count(self, group: ChatGroup, user_id: int = None) -> int:
        if user_id is None:
            user_id = self.user_id
        count = GroupMessageInfo.objects.filter(
            message__group=group,
            person__id=user_id,
            unread=True
        ).count()
        return count

    def _get_members(self, group: ChatGroup) -> dict:
        return GroupMembership.objects.filter(group=group)

    def list(self, filter_=None) -> dict:
        groups = ChatGroup.objects.filter(members__exact=self.user_id)
        return [self.get(group.id, filter_=filter_) for group in groups]

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
            data = self.get(group.id)
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
            data = self.get(group.id)
            return data, True
        else:
            return {"detail": form.errors["__all__"][0]}, False

    def delete(self, id_: int) -> (dict, bool):
        try:
            group = ChatGroup.objects.get(id=id_)
            group.delete()
            return {"id": id_}, True
        except ObjectDoesNotExist:
            return {"detail": "group doesn't exist"}, False

    def send_message(self, group_id: int, text: str) -> (dict, bool):
        message_data = {
            "group": group_id,
            "sender": self.user_id,
            "text": text
        }
        form = GroupMessageForm(message_data)
        if form.is_valid():
            message = form.save()
            data = self._get_serialized_message(message)
            return data, True
        else:
            return {"detail": form.errors["__all__"][0]}, False

    def _get_serialized_message(self, instance: GroupMessage, user_id: int = None, many: bool = False) -> dict:
        if user_id is None:
            user_id = self.user_id
        if many:
            messages = GroupMessageSerializer(instance, many=True).data
            for message in messages:
                info = GroupMessageInfo.objects.get(person__id=user_id, message=message)
                message["unread"] = info.unread
                message["stared"] = info.stared
            return messages
        else:
            message = GroupMessageSerializer(instance).data
            info = GroupMessageInfo.objects.get(person__id=user_id, message=instance)
            message["unread"] = info.unread
            message["stared"] = info.stared
            return message

    def delete_message(self, message_id: int) -> (dict, bool):
        try:
            message = GroupMessage.objects.get(id=message_id)
        except ObjectDoesNotExist:
            return {"detail": "Message doesn't exist"}, False
        if message.sender.id != self.user_id:
            return {"detail": "You can't delete foreign message"}, False
        chat_id = message.group.id
        message.delete()
        return {"chat_id": chat_id, "message_id": message_id}, True

    def update_message(self, message_id: int, new_text: str) -> (dict, bool):
        try:
            message = GroupMessage.objects.get(id=message_id)
        except ObjectDoesNotExist:
            return {"detail": "Message doesn't exist"}, False
        if message.sender.id != self.user_id:
            return {"detail": "You can't update foreign messages"}, False

        form = GroupMessageForm(instance=message)
        new_message = form.save(commit=False)
        new_message.text = new_text
        new_message.save()
        return self._get_serialized_message(new_message), True

    def star_message(self, message_id: int, stared: bool):
        try:
            info = GroupMessageInfo.objects.get(
                message__id=message_id,
                person__id=self.user_id,
            )
        except ObjectDoesNotExist:
            return {"detail": "Message doesn't exist"}, False
        info.stared = stared
        info.save()
        return {"id": message_id, "stared": stared}, True

    def set_as_read(self, messages: list) -> None:
        for message in messages:
            info = GroupMessageInfo.objects.get(
                person=self.user_id,
                message__id=message["message_id"]
            )
            info.unread = False
            info.save()
