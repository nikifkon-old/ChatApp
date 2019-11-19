from datetime import datetime
from channels.db import database_sync_to_async
from django.core.exceptions import (
    ObjectDoesNotExist,
    ValidationError,
)

class EventsDBMixin:
    @database_sync_to_async
    def get_messages(self, id_, user_id, filter_=None):
        """ Get chat with messages """
        chat = self.Meta.chat_model.objects.get(id=id_)
        serialized = self.Meta.chat_serializer(
            chat,
            context={
                'message_details': True,
                'filter': filter_,
                'user_id': user_id,
            }
        )
        return serialized.data

    @database_sync_to_async
    def get_list(self, id_, filter_=None):
        """ Get list of chats without messages """
        message_details = False
        if filter_ is not None:
            if filter_ == 'unread':
                info = self.Meta.message_info_model.objects.filter(
                    person__id=id_,
                    unread=True
                )
            if filter_ == 'stared':
                info = self.Meta.message_info_model.objects.filter(
                    person__id=id_,
                    stared=True
                )
                message_details = True
            chat_qs = self.Meta.chat_model.objects.filter(
                members__id=id_,
                messages__message_info__in=info
            ).distinct()
        else:
            chat_qs = self.Meta.chat_model.objects.filter(members__id=id_)
        serialized = self.Meta.chat_serializer(
            chat_qs,
            context={
                'message_details': message_details,
                'user_id': id_,
                'filter': filter_,
            },
            many=True
        )
        return serialized.data

    @database_sync_to_async
    def send_message(self, id_, text):
        """ Create message in Database """
        kwargs = {
            'sender_id': self.user.id,
            '%s_id' % self.Meta.name: id_,
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
    def delete_message(self, id_):
        """ Delete message in Database """
        try:
            message = self.Meta.message_model.objects.get(id=id_)
            if message.sender.id != self.user.id:
                return {'detail': 'You can\'t delete foreign message'}, False
            message.delete()
            return {
                'chat_id': getattr(message, f'{self.Meta.name}').id,
                'message_id': id_
            }, True

        except ObjectDoesNotExist:
            return {'detail': 'Message doesn\'t exist'}, False

    @database_sync_to_async
    def update_message(self, id_, text=None, stared=None, unread=None):
        """ Update message in Database """
        try:
            message = self.Meta.message_model.objects.get(id=id_)
            if text:
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
    def set_as_read(self, messages):
        for message in messages:
            info = self.Meta.message_info_model.objects.get(
                person=self.user.id,
                message__id=message['message_id']
            )
            info.unread = False
            info.save()

    @database_sync_to_async
    def create_chat(self, id_):
        """ Create chat in Database """
        try:
            self.Meta.chat_model.check_unique_members(self.user.id, id_)
        except ValidationError as error:
            return {'detail': str(error.message)}, False

        new_chat = self.Meta.chat_model.objects.create()
        kwargs1 = {
            self.Meta.name : new_chat,
            'person_id': id_
        }
        kwargs2 = {
            self.Meta.name : new_chat,
            'person_id': self.user.id
        }
        m1 = self.Meta.chat_membership(**kwargs1)
        m2 = self.Meta.chat_membership(**kwargs2)
        try:
            m1.save_base()
            m2.save_base()
        except ValidationError as error:
            return {'detail': str(error.message)}, False

        data1 = self.Meta.chat_serializer(
            new_chat,
            context={'user_id': self.user.id}
        ).data
        data2 = self.Meta.chat_serializer(
            new_chat,
            context={'user_id': id_}
        ).data
        return {
            self.user.id: data1,
            id_: data2,
            "chat_id": new_chat.id
        }, True

    @database_sync_to_async
    def delete_chat(self, id_):
        """ Delete chat in Databese """
        try:
            chat = self.Meta.chat_model.objects.get(id=id_)
            chat.delete()
            return {"id": id_}, True
        except ObjectDoesNotExist:
            return {'detail': f'{self.Meta.name} doesn\'t exist'}, False

    @database_sync_to_async
    def star_message(self, message_id, star):
        try:
            info = self.Meta.message_info_model.objects.get(
                message__id=message_id,
                person__id=self.user.id,
            )
        except ObjectDoesNotExist:
            return False
        info.stared = star
        info.save()
        return {"id": message_id, "stared": star}, True
