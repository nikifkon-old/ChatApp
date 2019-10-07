from rest_framework import serializers

from backend.profiles.models import Profile
from django.contrib.auth.models import User


# class UserSerializer(serializers.ModelSerializer):
#     """ Django User Serializer """
#     class Meta:
#         model = User
#         fields = ("username", "email")


class ProfileSerializer(serializers.ModelSerializer):
    """ Profile Serializer"""
    user = serializers.StringRelatedField()

    class Meta:
        model = Profile
        fields = ("user", "avatar", "tel", "birth", "gender", "groups", "dialogs",)
