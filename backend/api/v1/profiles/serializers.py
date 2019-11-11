from rest_framework import serializers

from backend.profiles.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    """ Profile Serializer"""
    user = serializers.StringRelatedField()

    class Meta:
        model = Profile
        fields = (
            "user",
            "avatar",
            "tel",
            "birth",
            "gender",
            "groups",
            "dialogs"
        )
