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
from backend.dialogs.models import DialogMessageInfo


class DialogDataBase:
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
        if filter:
            if filter == 'unread':
                info = DialogMessageInfo.objects.filter(person__id=id, unread=True)
            if filter == 'stared':
                info = DialogMessageInfo.objects.filter(person__id=id, stared=True)
            dialogs = Dialog.objects.filter(
                members__id=id,
                messages__dialogmessageinfo__in=info
            ).distinct()
        else:
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
        serialized = DialogMessageSerializer(
            new_message,
            context={
                'user_id': self.user.id
            }
        )
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
    def update_dialog_message(self, id, text=None, stared=None, unread=None):
        """ Update message in Database """
        try:
            message = DialogMessage.objects.get(id=id)
            if(text is not None):
                message.text = text
            # if(stared is not None or unread is not None):
            #    info = DialogMessageInfo.objects.get(
            #        message=message,
            #        person__id=self.user.id
            #    )
            #    if(unread is not None):
            #        info.unread = unread
            #    if(stared is not None):
            #        info.stared = stared
            #    info.save()
            message.save(unread=unread)
            serialized = DialogMessageSerializer(
                message,
                context={
                    'user_id': self.user.id
                }
            )
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
