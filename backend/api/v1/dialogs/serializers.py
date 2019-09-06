from rest_framework import serializers

from backend.dialogs.models import Dialog, DialogMembership


class DialogMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = DialogMembership
        fields = ("person", "dialog",)


class DialogSerializer(serializers.ModelSerializer):
    """ Group Serializer"""
    # members = DialogMemberSerializer(many=True, read_only=True)

    class Meta:
        model = Dialog
        fields = ("id", "members",)
