from rest_framework import serializers

from backend.groups.models import ChatGroup, GroupMembership


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupMembership
        fields = ("person", "group", "role", "date_joined")


class GroupSerializer(serializers.ModelSerializer):
    """ Group Serializer"""
    # members = MemberSerializer(many=True, read_only=True)

    class Meta:
        model = ChatGroup
        fields = ("name", "slug", "img", "description", "members")
