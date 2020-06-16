from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from channels.db import database_sync_to_async
from asgiref.sync import async_to_sync

from backend.api.v2.users.serializers import UserSerializer
from backend.api.v2.dialogs.serializers import DialogSerializer, DialogMessageSerializer, LastMessageSerizalizer
from backend.dialogs.models import Dialog, DialogMessage, DialogMessageInfo, DialogMembership
from backend.dialogs.forms import DialogForm, DialogMessageForm
from backend.socket_chat.mixins.view import ChatViewMixin


User = get_user_model()


class DialogView(ChatViewMixin):
    class Meta:
        chat_model = Dialog
        chat_serializer = DialogSerializer
        chat_form = DialogForm
        chat_message_model = DialogMessage
        chat_message_serializer = DialogMessageSerializer
        chat_message_form = DialogMessageForm
        chat_membership_model = DialogMembership
        chat_message_info_model = DialogMessageInfo
        last_message_serializer = LastMessageSerizalizer
        chat_name = "dialog"

    @database_sync_to_async
    def get(self, id_: int, with_messages: bool = False, filter_: str = None, user_id: int = None) -> dict:
        if user_id is None:
            user_id = self.user_id
        data = async_to_sync(super().get)(id_, with_messages, filter_, user_id)

        dialog = Dialog.objects.get(id=id_)
        interlocutor = self._get_interlocutor(dialog, user_id=user_id)
        data["interlocutor"] = UserSerializer(interlocutor).data

        return data

    def _get_interlocutor(self, dialog: Dialog, user_id: int = None) -> dict:
        if user_id is None:
            user_id = self.user_id
        members = DialogMembership.objects.filter(dialog=dialog)
        return members.exclude(person__id=user_id)[0].person

    @database_sync_to_async
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
                interlocutor_id: async_to_sync(self.get)(dialog.id, user_id=interlocutor_id),
                self.user_id: async_to_sync(self.get)(dialog.id)
            }
            return data, True
        else:
            return {"detail": form.errors["__all__"][0]}, False
