from datetime import datetime
from channels.db import database_sync_to_async
from django.core.exceptions import (
    ObjectDoesNotExist,
    ValidationError,
)

from backend.api.v1.dialogs.serializers import (
    DialogMessageSerializer,
    DialogSerializer,
)
from backend.dialogs.models import (
    DialogMessage,
    Dialog,
    DialogMembership,
)


class DialogDataBase:
    @database_sync_to_async
    def dialog_get(self, id, filter=None):
        """ Get user dialogs """
        dialogs = Dialog.objects.filter(members__id=id)
        serialized = DialogSerializer(
            dialogs,
            context={
                'message_details': True,
                'filter': filter,
                'user_id': id,
            },
            many=True
        )
        return serialized.data

    @database_sync_to_async
    def get_dialog_messages(self, dialog_id, user_id, filter=None):
        """ Get dialog with messages """
        dialog = Dialog.objects.get(id=dialog_id)
        serialized = DialogSerializer(
            dialog,
            context={
                'message_details': True,
                'filter': filter,
                'user_id': user_id,
            }
        )
        return serialized.data

    @database_sync_to_async
    def get_dialog_list(self, id, filter=None):
        """ Get list of dialogs without messages """
        dialogs = Dialog.objects.filter(members__id=id)
        serialized = DialogSerializer(
            dialogs,
            context={
                'message_details': False,
                'user_id': id,
                'filter': filter,
            },
            many=True
        )
        return serialized.data

    @database_sync_to_async
    def send_dialog_message(self, id, text):
        """ Create message in Database """
        new_message = DialogMessage.objects.create(
            sender_id=self.user.id,
            dialog_id=id,
            text=text,
            date=datetime.now()
        )
        serialized = DialogMessageSerializer(new_message)
        return serialized.data

    @database_sync_to_async
    def delete_dialog_message(self, id):
        """ Delete message in Database """
        try:
            message = DialogMessage.objects.get(id=id)
            message.delete()
            return (
                {
                    'dialog_id': message.dialog.id,
                    'message_id': id
                }, True
            )
        except ObjectDoesNotExist:
            return {'detail': 'Message doesn\'t exist'}, False

    @database_sync_to_async
    def update_dialog_message(self, id, text):
        """ Update message in Database """
        try:
            message = DialogMessage.objects.get(id=id)
            message.text = text
            message.save()
            serialized = DialogMessageSerializer(message)
            return (
                serialized.data, True
            )
        except ObjectDoesNotExist:
            return {'detail': 'Message doesn\'t exist'}, False

    @database_sync_to_async
    def create_dialog(self, id):
        """ Create Dialog room in Database """
        try:
            Dialog.check_unique_dialog_members(self.user.id, id)
        except ValidationError as e:
            return {'detail': str(e.message)}, None, False

        new_dialog = Dialog.objects.create()
        m2 = DialogMembership.objects.create(
            dialog=new_dialog,
            person_id=self.user.id
        )
        m1 = DialogMembership(
            dialog=new_dialog,
            person_id=id
        )
        try:
            m1.save_base()
            m2.save_base()
        except ValidationError as e:
            return {'detail': str(e.message)}, None, False

        data1 = DialogSerializer(
            new_dialog,
            context={'user_id': self.user.id}
        ).data
        data2 = DialogSerializer(
            new_dialog,
            context={'user_id': id}
        ).data
        return (
            {
                self.user.id: data1,
                id: data2
            },
            new_dialog.id,
            True
        )

    @database_sync_to_async
    def delete_dialog(self, id):
        """ Delete dialog in Databese """
        try:
            dialog = Dialog.objects.get(id=id)
            dialog.delete()
            return ({'dialog_id': id}, True)
        except ObjectDoesNotExist:
            return {'detail': 'Dialog doesn\'t exist'}, False
