from django.contrib.auth import get_user_model
from rest_framework import serializers

from backend.dialogs.models import Dialog, DialogMembership, DialogMessage

User = get_user_model()


class DialogMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = DialogMembership
        fields = ("person", "dialog",)


class LastMessageSerizalizer(serializers.ModelSerializer):
    class Meta:
        model = DialogMessage
        fields = ("sender", "text", "date",)


class DialogMessageSender(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "avatar",)


class DialogMessageSerializer(serializers.ModelSerializer):
    """ Message Serializer"""
    sender = DialogMessageSender()
    chat_id = serializers.IntegerField(source="chat.id")

    class Meta:
        model = DialogMessage
        fields = (
            "id",
            "sender",
            "chat_id",
            "text",
            "date",
        )


class DialogSerializer(serializers.ModelSerializer):
    """ Dialog Serializer"""
    class Meta:
        model = Dialog
        fields = ("id",)
