from rest_framework import serializers

from backend.dialogs.models import Dialog, DialogMembership
from backend.profiles.models import Profile
from backend.chat_messages.models import DialogMessage

class DialogMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = DialogMembership
        fields = ("person", "dialog",)


class LastMessageSerizalizer(serializers.ModelSerializer):
    class Meta:
        model = DialogMessage
        fields = ("sender", "text", "date",)


class PersonSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    user_id = serializers.SerializerMethodField()

    def get_user(self, obj):
        return obj.user.username

    def get_user_id(self, obj):
        return obj.user.id


    class Meta:
        model = Profile
        fields = ("user", "user_id", "avatar")


class DialogSerializer(serializers.ModelSerializer):
    """ Dialog Serializer"""
    members = PersonSerializer(many=True, read_only=True)
    last_message = serializers.SerializerMethodField()

    def get_last_message(self, obj):
        """ Get last message in dialog """
        message = DialogMessage.objects.filter(dialog=obj).order_by('-date')[0]
        return LastMessageSerizalizer(message).data

    def to_representation(self, obj):
        """ Remove Yourself from dialog members """
        ret = super().to_representation(obj)
        user_id = int(self.context['request'].query_params.get('user_id'))
        members = ret.get('members')
        for id, member in enumerate(members):
            if member.get('user_id') == user_id:
                members.pop(id)
        return ret


    class Meta:
        model = Dialog
        fields = ("id", "members", "last_message")
