from rest_framework import generics
from rest_framework.permissions import (SAFE_METHODS, BasePermission,
                                        IsAdminUser)

from backend.api.v1.profiles.serializers import ProfileSerializer
from backend.profiles.models import Profile


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        person_id = request.user.profile.id
        profile_id = int(request.parser_context['kwargs']['id'])
        return person_id == profile_id


class ProfileListCreateView(generics.ListCreateAPIView):
    """ Create & List Profile """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProfileRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    """ Get & Update & Delete Profile """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_url_kwarg = "id"
    lookup_field = "user__id"
    permission_classes = [IsAdminUser | ReadOnly]
