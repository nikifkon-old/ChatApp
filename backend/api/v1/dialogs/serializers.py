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


class DialogMessageSerializer(serializers.ModelSerializer):
    """ Message Serializer"""
    avatar = serializers.SerializerMethodField()
    sender_name = serializers.SerializerMethodField()
    chat_id = serializers.IntegerField(source="dialog.id")

    def get_sender_name(self, obj):
        return obj.sender.username

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
            "date",
        )


class DialogSerializer(serializers.ModelSerializer):
    """ Dialog Serializer"""
    class Meta:
        model = Dialog
        fields = ("id",)
