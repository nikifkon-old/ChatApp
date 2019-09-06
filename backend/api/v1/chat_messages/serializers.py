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
    class Meta:
        model = DialogMessage
        fields = ("id", "sender", "dialog", "text", "date")
