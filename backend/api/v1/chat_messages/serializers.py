from rest_framework import serializers

from backend.chat_messages.models import Message


class MessageSerializer(serializers.ModelSerializer):
    """ Message Serializer"""
    class Meta:
        model = Message
        fields = ("id", "sender", "group", "text", "date")
