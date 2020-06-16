from django.contrib.auth import get_user_model
from rest_framework import serializers

from backend.api.v2.users.serializers import UserSerializer
from backend.groups.models import ChatGroup, GroupMembership, GroupMessage

User = get_user_model()


class MemberSerializer(serializers.ModelSerializer):
    person = UserSerializer(read_only=True)

    class Meta:
        model = GroupMembership
        fields = ("person", "role", "date_joined")


class GroupSerializer(serializers.ModelSerializer):
    """ Group Serializer"""
    class Meta:
        model = ChatGroup
        fields = (
            "id",
            "name",
            "slug",
            "img",
            "description",
        )


class LastMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupMessage
        fields = ("sender", "text", "date",)


class GroupMessageSender(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "avatar",)


class GroupMessageSerializer(serializers.ModelSerializer):
    """ Message Serializer"""
    sender = GroupMessageSender()
    chat_id = serializers.IntegerField(source="chat.id")

    class Meta:
        model = GroupMessage
        fields = (
            "id",
            "sender",
            "chat_id",
            "text",
            "date",
        )
