from rest_framework import serializers

from backend.profiles.models import Profile
from django.contrib.auth.models import User
 

class UserSerializer(serializers.ModelSerializer):
    """ Django User Serializer """
    class Meta:
        model = User
        fields = ("__all__")


# HyperlinkedModelSerializer ???
class ProfileSerializer(serializers.ModelSerializer):
    """ Profile Serializer"""
    # user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ("user", "avatar", "tel", "birth", "gender", "groups")
