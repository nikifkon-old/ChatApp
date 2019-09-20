from rest_framework import serializers
from backend.chat_messages.models import (
    GroupMessage,
    DialogMessage,
)


class GroupMessageSerializer(serializers.ModelSerializer):
    """ Message Serializer"""

    class Meta:
        model = GroupMessage
        fields = ("id", "sender", "group", "text", "date")


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
