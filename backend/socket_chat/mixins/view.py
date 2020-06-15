from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from channels.db import database_sync_to_async
from asgiref.sync import async_to_sync


User = get_user_model()


class ChatViewMixin:
    class Meta:
        chat_model = None
        chat_serializer = None
        chat_form = None
        chat_message_model = None
        chat_message_serializer = None
        chat_message_form = None
        chat_membership_model = None
        chat_message_info_model = None
        last_message_serializer = None
        chat_name = "chat"

    user_id = None

    def set_user_id(self, user_id: int):
        self.user_id = user_id

    @database_sync_to_async
    def get(self, id_: int, with_messages: bool = False, filter_: str = None, user_id: int = None) -> dict:
        if user_id is None:
            user_id = self.user_id
        chat = self.Meta.chat_model.objects.get(id=id_)
        data = self.Meta.chat_serializer(chat).data

        last_message = self._get_last_message(chat)
        data["last_message"] = self.Meta.last_message_serializer(last_message).data

        data["unread_count"] = self._get_unread_count(chat, user_id=user_id)

        messages = []
        if with_messages:
            messages = self._get_chat_messages_with_filter(chat, filter_=filter_)
        data["messages"] = self._get_serialized_message(messages, many=True, user_id=user_id)
        return data

    def _get_last_message(self, chat):
        return chat.messages.last()

    def _get_unread_count(self, chat, user_id: int = None) -> int:
        if user_id is None:
            user_id = self.user_id
        count = self.Meta.chat_message_info_model.objects.filter(
            message__chat=chat,
            person__id=user_id,
            unread=True
        ).count()
        return count

    def _get_chat_messages_with_filter(self, chat, filter_: str = None):
        if filter_ is not None:
            user = User.objects.get(id=self.user_id)
            if filter_ == "stared":
                info = self.Meta.chat_message_info_model.objects.filter(person=user, stared=True)
                messages = self.Meta.chat_message_model.objects.filter(chat=chat, message_info__in=info)
            elif filter_ == "unread":
                info = self.Meta.chat_message_info_model.objects.filter(person=user, unread=True)
                messages = self.Meta.chat_message_model.objects.filter(chat=chat, message_info__in=info)
        else:
            messages = chat.messages.all()
        return messages

    def _get_serialized_message(self, instance, user_id: int = None, many: bool = False) -> dict:
        if user_id is None:
            user_id = self.user_id
        if many:
            messages = self.Meta.chat_message_serializer(instance, many=True).data
            for message in messages:
                info = self.Meta.chat_message_info_model.objects.get(person__id=user_id, message__id=message["id"])
                message["unread"] = info.unread
                message["stared"] = info.stared
            return messages
        else:
            message = self.Meta.chat_message_serializer(instance).data
            info = self.Meta.chat_message_info_model.objects.get(person__id=user_id, message=instance)
            message["unread"] = info.unread
            message["stared"] = info.stared
            return message

    @database_sync_to_async
    def list(self, filter_=None) -> dict:
        chats = self.Meta.chat_model.objects.filter(members__exact=self.user_id)
        return [async_to_sync(self.get)(chat.id, filter_=filter_) for chat in chats]

    @database_sync_to_async
    def create(self):
        raise NotImplementedError("You must override create method")

    @database_sync_to_async
    def delete(self, id_: int) -> (dict, bool):
        try:
            chat = self.Meta.chat_model.objects.get(id=id_)
            chat.delete()
            return {"id": id_}, True
        except ObjectDoesNotExist:
            return {"detail": "%s doesn't exist" % self.Meta.chat_name}, False

    @database_sync_to_async
    def send_message(self, chat_id: int, text: str) -> (dict, bool):
        message_data = {
            "chat": chat_id,
            "sender": self.user_id,
            "text": text
        }
        form = self.Meta.chat_message_form(message_data)
        if form.is_valid():
            message = form.save()
            data = self._get_serialized_message(message)
            return data, True
        else:
            return {"detail": form.errors["__all__"][0]}, False

    @database_sync_to_async
    def delete_message(self, message_id: int) -> (dict, bool):
        try:
            message = self.Meta.chat_message_model.objects.get(id=message_id)
        except ObjectDoesNotExist:
            return {"detail": "Message doesn't exist"}, False
        if message.sender.id != self.user_id:
            return {"detail": "You can't delete foreign message"}, False
        chat_id = message.chat.id
        message.delete()
        return {"chat_id": chat_id, "message_id": message_id}, True

    @database_sync_to_async
    def update_message(self, message_id: int, new_text: str) -> (dict, bool):
        try:
            message = self.Meta.chat_message_model.objects.get(id=message_id)
        except ObjectDoesNotExist:
            return {"detail": "Message doesn't exist"}, False
        if message.sender.id != self.user_id:
            return {"detail": "You can't update foreign messages"}, False

        form = self.Meta.chat_message_form(instance=message)
        new_message = form.save(commit=False)
        new_message.text = new_text
        new_message.save()
        return self._get_serialized_message(new_message), True

    @database_sync_to_async
    def star_message(self, message_id: int, stared: bool):
        try:
            info = self.Meta.chat_message_info_model.objects.get(
                message__id=message_id,
                person__id=self.user_id,
            )
        except ObjectDoesNotExist:
            return {"detail": "Message doesn't exist"}, False
        info.stared = stared
        info.save()
        return {"id": message_id, "stared": stared}, True

    @database_sync_to_async
    def set_as_read(self, messages: list) -> None:
        for message in messages:
            info = self.Meta.chat_message_info_model.objects.get(
                person=self.user_id,
                message__id=message["message_id"]
            )
            info.unread = False
            info.save()
