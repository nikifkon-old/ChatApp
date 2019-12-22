from rest_framework import serializers
from django.contrib.auth import get_user_model

from backend.api.v1.profiles.serializers import ProfileSerializer
from backend.dialogs.models import (
    Dialog,
    DialogMembership,
    DialogMessage,
    DialogMessageInfo,
)
from backend.profiles.models import Profile


User = get_user_model()


class DialogMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = DialogMembership
        fields = ("person", "dialog",)


class LastMessageSerizalizer(serializers.ModelSerializer):
    class Meta:
        model = DialogMessage
        fields = ("sender", "text", "date",)


class PersonSerializer(serializers.ModelSerializer):
    """ Interlocutor serializer """
    user = serializers.SerializerMethodField()
    user_id = serializers.SerializerMethodField()

    def get_user(self, obj):
        return obj.user.username

    def get_user_id(self, obj):
        return obj.user.id

    class Meta:
        model = Profile
        fields = ("user", "user_id", "avatar")


class DialogMessageSerializer(serializers.ModelSerializer):
    """ Message Serializer"""
    avatar = serializers.SerializerMethodField()
    sender_name = serializers.SerializerMethodField()
    unread = serializers.SerializerMethodField()
    stared = serializers.SerializerMethodField()
    chat_id = serializers.IntegerField(source="dialog.id")

    def get_unread(self, obj):
        if self.context.get('user_id'):
            info = DialogMessageInfo.objects.get(
                message=obj,
                person=self.context.get('user_id')
            )
            return info.unread

    def get_stared(self, obj):
        if self.context.get('user_id'):
            info = DialogMessageInfo.objects.get(
                message=obj,
                person=self.context.get('user_id')
            )
            return info.stared

    def get_sender_name(self, obj):
        return obj.sender.user.username

    def get_avatar(self, obj):
        if obj.sender.avatar:
            return obj.sender.avatar.url

    class Meta:
        model = DialogMessage
        fields = (
            "id",
            "sender",
            "sender_name",
            "avatar",
            "chat_id",
            "text",
            "unread",
            "stared",
            "date",
        )


class DialogSerializer(serializers.ModelSerializer):
    """ Dialog Serializer"""
    messages = serializers.SerializerMethodField()
    last_message = serializers.SerializerMethodField()
    unread_count = serializers.SerializerMethodField()
    interlocutor = serializers.SerializerMethodField()
    messages_qs = None

    @property
    def user_id(self):
        if self.context.get('request'):
            user_id = self.context.get('request').query_params.get('user_id')
        else:
            user_id = self.context.get('user_id')
        return user_id

    def get_messages(self, obj):
        """ get messages qs with passed filters"""
        self.messages_qs = obj.messages.all()
        # filters
        if self.user_id:
            if self.context.get('filter') == 'unread':
                person = User.objects.get(id=self.user_id).profile
                self.messages_qs = person.dialog_messages.filter(
                    dialog=obj,
                    message_info__unread=True
                )
            elif self.context.get('filter') == 'stared':
                person = User.objects.get(id=self.user_id).profile
                self.messages_qs = person.dialog_messages.filter(
                    dialog=obj,
                    message_info__stared=True
                )

        if self.context.get('message_details'):
            serialized = DialogMessageSerializer(
                self.messages_qs,
                context={
                    "user_id": self.user_id
                },
                many=True
            )
        else:
            serialized = DialogMessageSerializer(
                obj.messages.none(),
                many=True,
            )
        return serialized.data

    def get_interlocutor(self, obj):
        """ Get Interlocutor if `user_id` in query_params """
        if self.user_id:
            # remove yourself
            qs_interlocutor = DialogMembership.objects.filter(dialog=obj)\
                .exclude(person__id=self.user_id)
            serializer = ProfileSerializer(qs_interlocutor[0].person)
        else:
            # get all members
            profiles = User.objects.filter(profile__dialogs=obj)
            serializer = ProfileSerializer(profiles, many=True)

        return serializer.data

    def get_unread_count(self, obj):
        """ Get count of unread messages """
        if self.user_id:
            count = DialogMessageInfo.objects.filter(
                message__dialog=obj,
                person__id=self.user_id,
                unread=True
            ).count()
            return count

    def get_last_message(self, _):
        """ Get last message in dialog """
        try:
            message = self.messages_qs.last()
        except IndexError:
            message = None
        return LastMessageSerizalizer(message).data

    class Meta:
        model = Dialog
        fields = (
            "id",
            "messages",
            "interlocutor",
            "unread_count",
            "last_message"
        )
