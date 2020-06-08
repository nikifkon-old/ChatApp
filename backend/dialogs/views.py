from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist

from backend.api.v1.users.serializers import UserSerializer
from backend.api.v1.dialogs.serializers import DialogSerializer, DialogMessageSerializer, LastMessageSerizalizer
from backend.dialogs.models import Dialog, DialogMessage, DialogMessageInfo, DialogMembership
from backend.dialogs.forms import DialogForm, DialogMessageForm


User = get_user_model()


class DialogView:
    user_id = None

    def set_user_id(self, user_id: int):
        self.user_id = user_id

    def get(self, id_: int, with_messages: bool = False, filter_: str = None, user_id: int = None) -> dict:
        if user_id is None:
            user_id = self.user_id
        dialog = Dialog.objects.get(id=id_)
        data = DialogSerializer(dialog).data

        last_message = self._get_last_message(dialog)
        data["last_message"] = LastMessageSerizalizer(last_message).data

        data["unread_count"] = self._get_unread_count(dialog, user_id=user_id)

        interlocutor = self._get_interlocutor(dialog, user_id=user_id)
        data["interlocutor"] = UserSerializer(interlocutor).data

        messages = []
        if with_messages:
            messages = dialog.messages.all()
            # do filtering
            messages = DialogMessageSerializer(messages, many=True).data
        data["messages"] = messages
        return data

    def _get_last_message(self, dialog: Dialog) -> DialogMessage:
        return dialog.messages.last()

    def _get_unread_count(self, dialog: Dialog, user_id: int = None) -> int:
        if user_id is None:
            user_id = self.user_id
        count = DialogMessageInfo.objects.filter(
            message__dialog=dialog,
            person__id=user_id,
            unread=True
        ).count()
        return count

    def _get_interlocutor(self, dialog: Dialog, user_id: int = None) -> dict:
        if user_id is None:
            user_id = self.user_id
        members = DialogMembership.objects.filter(dialog=dialog)
        return members.exclude(person__id=user_id)[0].person

    def list(self, filter_=None) -> dict:
        dialogs = Dialog.objects.filter(members__exact=self.user_id)
        return [self.get(dialog.id, filter_=filter_) for dialog in dialogs]

    def create(self, interlocutor_id: id) -> (dict, bool):
        try:
            interlocutor = User.objects.get(id=interlocutor_id)
        except ObjectDoesNotExist:
            return {"detail": "User does not exist"}, False

        user = User.objects.get(id=self.user_id)
        dialog_data = {"members": [user, interlocutor]}
        form = DialogForm(dialog_data)
        if form.is_valid():
            dialog = form.save()
            data = {
                "chat_id": dialog.id,
                interlocutor_id: self.get(dialog.id, user_id=interlocutor_id),
                self.user_id: self.get(dialog.id)
            }
            return data, True
        else:
            return {"detail": form.errors["__all__"][0]}, False

    def delete(self, id_: int) -> (dict, bool):
        try:
            dialog = Dialog.objects.get(id=id_)
            dialog.delete()
            return {"id": id_}, True
        except ObjectDoesNotExist:
            return {"detail": "dialog doesn't exist"}, False

    def send_message(self, dialog_id: int, text: str) -> (dict, bool):
        message_data = {
            "dialog": dialog_id,
            "sender": self.user_id,
            "text": text
        }
        form = DialogMessageForm(message_data)
        if form.is_valid():
            message = form.save()
            data = self._get_serialized_message(message)
            return data, True
        else:
            return {"detail": form.errors["__all__"][0]}, False

    def _get_serialized_message(self, instance: DialogMessage, user_id: int = None, many: bool = False) -> dict:
        if user_id is None:
            user_id = self.user_id
        if many:
            messages = DialogMessageSerializer(instance, many=True).data
            for message in messages:
                info = DialogMessageInfo.objects.get(person__id=user_id, message=message)
                message["unread"] = info.unread
                message["stared"] = info.stared
            return messages
        else:
            message = DialogMessageSerializer(instance).data
            info = DialogMessageInfo.objects.get(person__id=user_id, message=instance)
            message["unread"] = info.unread
            message["stared"] = info.stared
            return message

    def delete_message(self, message_id: int) -> (dict, bool):
        try:
            message = DialogMessage.objects.get(id=message_id)
        except ObjectDoesNotExist:
            return {"detail": "Message doesn't exist"}, False
        if message.sender.id != self.user_id:
            return {"detail": "You can't delete foreign message"}, False
        chat_id = message.dialog.id
        message.delete()
        return {"chat_id": chat_id, "message_id": message_id}, True

    def update_message(self, message_id: int, new_text: str) -> (dict, bool):
        try:
            message = DialogMessage.objects.get(id=message_id)
        except ObjectDoesNotExist:
            return {"detail": "Message doesn't exist"}, False
        if message.sender.id != self.user_id:
            return {"detail": "You can't update foreign messages"}, False

        form = DialogMessageForm(instance=message)
        new_message = form.save(commit=False)
        new_message.text = new_text
        new_message.save()
        return self._get_serialized_message(new_message), True

    def star_message(self, message_id: int, stared: bool):
        try:
            info = DialogMessageInfo.objects.get(
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
            info = DialogMessageInfo.objects.get(
                person=self.user_id,
                message__id=message["message_id"]
            )
            info.unread = False
            info.save()
