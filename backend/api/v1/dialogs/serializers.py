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


class DialogSerializer(serializers.ModelSerializer):
    """ Dialog Serializer"""

    last_message = serializers.SerializerMethodField()
    interlocutor = serializers.SerializerMethodField()

    def get_interlocutor(self, obj):
        """ Get Interlocutor if `user_id` in query_params """
        user_id = self.context['request'].query_params.get('user_id')
        if user_id:
            id = int(user_id)
            # remove yourself
            qs_interlocutor = DialogMembership.objects.filter(dialog=obj)\
                .exclude(person__id=id)
            serializer = PersonSerializer(qs_interlocutor[0].person)
        else:
            # get all members
            profiles = Profile.objects.filter(dialogs=obj)
            serializer = PersonSerializer(profiles, many=True)

        return serializer.data

    def get_last_message(self, obj):
        """ Get last message in dialog """
        message = DialogMessage.objects.filter(dialog=obj).order_by('-date')[0]
        return LastMessageSerizalizer(message).data


    class Meta:
        model = Dialog
        fields = ("id", "interlocutor", "last_message")
