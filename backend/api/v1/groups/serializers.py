from rest_framework import serializers

from backend.api.v1.profiles.serializers import ProfileSerializer
from backend.groups.models import (ChatGroup, GroupMembership, GroupMessage,
                                   GroupMessageInfo)
from backend.profiles.models import Profile


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupMembership
        fields = ("person", "group", "role", "date_joined")


class ProfileAsMemberSerializer(ProfileSerializer):
    role = serializers.SerializerMethodField()
    date_joined = serializers.SerializerMethodField()

    @property
    def group_id(self):
        return self.context.get('group_id')

    def get_membership(self, obj):
        return GroupMembership.objects.get(
            group__id=self.group_id,
            person=obj
        )

    def get_role(self, obj):
        return self.get_membership(obj).role

    def get_date_joined(self, obj):
        date = self.get_membership(obj).date_joined
        return str(date)

    class Meta:
        model = ProfileSerializer.Meta.model
        fields = ProfileSerializer.Meta.fields + ("role", "date_joined")


class GroupSerializer(serializers.ModelSerializer):
    """ Group Serializer"""
    messages = serializers.SerializerMethodField()
    last_message = serializers.SerializerMethodField()
    unread_count = serializers.SerializerMethodField()
    members = serializers.SerializerMethodField()

    messages_qs = None

    @property
    def user_id(self):
        if self.context.get('requests'):
            return self.context.get('request').query_params.get('user_id')
        else:
            return self.context.get('user_id')

    def get_messages(self, obj):
        self.messages_qs = obj.messages.all()

        if self.user_id:
            person = Profile.objects.get(id=self.user_id)
            if self.context.get('filter') == 'unread':
                self.messages_qs = person.group_messages.filter(
                    group=obj,
                    message_info__unread=True
                )
            elif self.context.get('filter') == 'stared':
                self.messages_qs = person.group_messages.filter(
                    group=obj,
                    message_info__stared=True
                )

        if self.context.get('message_details'):
            return GroupMessageSerializer(
                self.messages_qs,
                context={
                    "user_id": self.user_id
                },
                many=True
            ).data
        else:
            return GroupMessageSerializer(
                obj.messages.none(),
                context={
                    "user_id": self.user_id
                },
                many=True
            ).data

    def get_last_message(self, _):
        message = None
        if len(self.messages_qs) > 0:
            message = self.messages_qs.last()
        return GroupMessageSerializer(
            message,
            context={
                "user_id": self.user_id
            }
        ).data

    def get_unread_count(self, obj):
        if self.user_id:
            count = GroupMessageInfo.objects.filter(
                message__group=obj,
                person__id=self.user_id,
                unread=True
            ).count()
            return count

    def get_members(self, obj):
        return ProfileAsMemberSerializer(
            obj.members.all(),
            many=True,
            read_only=True,
            context={
                "group_id": obj.id
            }
        ).data

    class Meta:
        model = ChatGroup
        fields = (
            "name",
            "id",
            "slug",
            "img",
            "description",
            "members",
            "messages",
            "last_message",
            "unread_count"
        )


class GroupMessageSerializer(serializers.ModelSerializer):
    """ Message Serializer"""
    unread = serializers.SerializerMethodField()
    stared = serializers.SerializerMethodField()

    @property
    def user_id(self):
        if self.context.get('requests'):
            return self.context.get('request').query_params.get('user_id')
        else:
            return self.context.get('user_id')

    def get_message_info(self, obj):
        return GroupMessageInfo.objects.get(
            message=obj,
            person__id=self.user_id
        )

    def get_unread(self, obj):
        return self.get_message_info(obj).unread

    def get_stared(self, obj):
        return self.get_message_info(obj).stared

    class Meta:
        model = GroupMessage
        fields = (
            "id",
            "sender",
            "group",
            "text",
            "date",
            "unread",
            "stared"
        )
