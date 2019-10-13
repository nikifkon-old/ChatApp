from rest_framework import serializers

from backend.dialogs.models import (
    Dialog,
    DialogMembership,
    DialogMessage,
    DialogMessageInfo,
)
from backend.profiles.models import Profile
from backend.api.v1.profiles.serializers import ProfileSerializer


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

    def get_sender_name(self, obj):
        return obj.sender.user.username

    def get_avatar(self, obj):
        return obj.sender.avatar.url

    class Meta:
        model = DialogMessage
        fields = (
            "id",
            "sender",
            "sender_name",
            "avatar",
            "dialog",
            "text",
            "date",
        )


class DialogSerializer(serializers.ModelSerializer):
    """ Dialog Serializer"""
    messages = serializers.SerializerMethodField()
    last_message = serializers.SerializerMethodField()
    interlocutor = serializers.SerializerMethodField()

    def get_messages(self, obj):
        """ get messages qs with passed filters"""
        self.messages_qs = obj.messages.all()
        user_id = self.context.get('user_id')

        if user_id:
            if self.context.get('filter') == 'unread':
                messages_info = DialogMessageInfo.objects.filter(
                    unread=True,
                    person=user_id,
                    message__dialog=obj
                )
                self.messages_qs = [
                    message_info.message for message_info in messages_info
                ]
            if self.context.get('filter') == 'stared':
                messages_info = DialogMessageInfo.objects.filter(
                    stared=True,
                    person=user_id,
                    message__dialog=obj
                )
                self.messages_qs = [
                    message_info.message for message_info in messages_info
                ]
        return DialogMessageSerializer(self.messages_qs, many=True).data

    def get_interlocutor(self, obj):
        """ Get Interlocutor if `user_id` in query_params """
        if self.context.get('request'):
            user_id = self.context.get('request').query_params.get('user_id')
        else:
            user_id = self.context.get('user_id')
        if user_id:
            id = int(user_id)
            # remove yourself
            qs_interlocutor = DialogMembership.objects.filter(dialog=obj)\
                .exclude(person__id=id)
            serializer = ProfileSerializer(qs_interlocutor[0].person)
        else:
            # get all members
            profiles = Profile.objects.filter(dialogs=obj)
            serializer = ProfileSerializer(profiles, many=True)

        return serializer.data

    def get_last_message(self, obj):
        """ Get last message in dialog """
        try:
            message = self.messages_qs[0]
        except IndexError:
            message = None
        return LastMessageSerizalizer(message).data

    class Meta:
        model = Dialog
        fields = ("id", "messages", "interlocutor", "last_message")
