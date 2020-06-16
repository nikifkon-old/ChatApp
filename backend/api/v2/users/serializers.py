from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """ User Serializer"""
    class Meta:
        model = User
        fields = (
            "username",
            "avatar",
            "tel",
            "birth",
            "gender",
        )
