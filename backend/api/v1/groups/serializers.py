from django.contrib.auth import get_user_model
from rest_framework import serializers

from backend.api.v1.users.serializers import UserSerializer
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


class GroupMessageSerializer(serializers.ModelSerializer):
    """ Message Serializer"""
    avatar = serializers.SerializerMethodField()
    sender_name = serializers.SerializerMethodField()
    chat_id = serializers.IntegerField(source="group.id")

    def get_sender_name(self, obj):
        return obj.sender.username

    def get_avatar(self, obj):
        if obj.sender.avatar:
            return obj.sender.avatar.url

    class Meta:
        model = GroupMessage
        fields = (
            "id",
            "sender",
            "sender_name",
            "avatar",
            "chat_id",
            "text",
            "date",
        )
