from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """ User Serializer"""
    user = serializers.StringRelatedField()

    class Meta:
        model = User
        fields = (
            "user",
            "avatar",
            "tel",
            "birth",
            "gender",
        )
