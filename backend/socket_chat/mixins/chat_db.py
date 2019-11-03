from datetime import datetime
from channels.db import database_sync_to_async
from django.core.exceptions import (
    ObjectDoesNotExist,
    ValidationError,
)

class ChatDBMixin:
    @database_sync_to_async
    def get_messages(self, id, user_id, filter=None):
        """ Get chat with messages """
        chat = self.Meta.chat_model.objects.get(id=id)
        serialized = self.Meta.chat_serializer(
            chat,
            context={
                'message_details': True,
                'filter': filter,
                'user_id': user_id,
            }
    )
        return serialized.data 

    @database_sync_to_async
    def get_list(self, id, filter=None):
        """ Get list of chats without messages """
        message_details = False
        if filter is not None:
            if filter == 'unread':
                info = self.Meta.message_info_model.objects.filter(
                    person__id=id,
                    unread=True
                )
            if filter == 'stared':
                info = self.Meta.message_info_model.objects.filter(
                    person__id=id,
                    stared=True
                )
                message_details = True
            chat_qs = self.Meta.chat_model.objects.filter(
                members__id=id,
                messages__message_info__in=info
            ).distinct()
        else:
            chat_qs = self.Meta.chat_model.objects.filter(members__id=id)
        serialized = self.Meta.chat_serializer(
            chat_qs,
            context={
                'message_details': message_details,
                'user_id': id,
                'filter': filter,
            },
            many=True
        )
        return serialized.data

    @database_sync_to_async
    def send_message(self, id, text):
        """ Create message in Database """
        kwargs = {
            'sender_id': self.user.id,
            '%s_id' % self.Meta.name: id,
            'text': text,
            'date': datetime.now()
        }
        new_message = self.Meta.message_model.objects.create(**kwargs)
        serialized = self.Meta.message_serializer(
            new_message,
            context={
                'user_id': self.user.id
            }
        )
        return serialized.data

    @database_sync_to_async
    def delete_message(self, id):
        """ Delete message in Database """
        try:
            message = self.Meta.message_model.objects.get(id=id)
            if message.sender.id != self.user.id:
                return {'detail': 'You can\'t delete foreign message'}, False
            message.delete()
            return {
                'chat_id': getattr(message, f'{self.Meta.name}').id,
                'message_id': id
            }, True
            
        except ObjectDoesNotExist:
            return {'detail': 'Message doesn\'t exist'}, False

    @database_sync_to_async
    def update_message(self, id, text=None, stared=None, unread=None):
        """ Update message in Database """
        try:
            message = self.Meta.message_model.objects.get(id=id)
            if(text is not None):
                if message.sender.id != self.user.id:
                    return {'detail': 'You can\'t update foreign messages'}, False
                message.text = text
            message.save(unread=unread, stared=stared)
            serialized = self.Meta.message_serializer(
                message,
                context={
                    'user_id': self.user.id
                }
            )
            return serialized.data, True
        except ObjectDoesNotExist:
            return {'detail': 'Message doesn\'t exist'}, False

    @database_sync_to_async
    def create_chat(self, id):
        """ Create chat in Database """
        try:
            self.Meta.chat_model.check_unique_members(self.user.id, id)
        except ValidationError as e:
            return {'detail': str(e.message)}, False

        new_chat = self.Meta.chat_model.objects.create()
        kwargs1 = {
            self.Meta.name : new_chat,
            'person_id': id
        }
        kwargs2 = {
            self.Meta.name : new_chat,
            'person_id': self.user.id
        }
        m1 = self.Meta.chat_membership(**kwargs1)
        m2 = self.Meta.chat_membership.objects.create(**kwargs2)
        try:
            m1.save_base()
            m2.save_base()
        except ValidationError as e:
            return {'detail': str(e.message)}, False

        data1 = self.Meta.chat_serializer(
            new_chat,
            context={'user_id': self.user.id}
        ).data
        data2 = self.Meta.chat_serializer(
            new_chat,
            context={'user_id': id}
        ).data
        return { self.user.id: data1, id: data2 }, True

    @database_sync_to_async
    def delete(self, id):
        """ Delete chat in Databese """
        try:
            chat = self.Meta.chat_model.objects.get(id=id)
            chat.delete()
            return id, True
        except ObjectDoesNotExist:
            return {'detail': f'{self.chat_name} doesn\'t exist'}, False
