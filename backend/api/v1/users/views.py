from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.permissions import (SAFE_METHODS, BasePermission,
                                        IsAdminUser)

from backend.api.v1.users.serializers import UserSerializer

User = get_user_model()


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        person_id = request.user.id
        user_id = int(request.parser_context['kwargs']['id'])
        return person_id == user_id


class UserListCreateView(generics.ListCreateAPIView):
    """ Create & List User """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    """ Get & Update & Delete User """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_url_kwarg = "id"
    lookup_field = "user__id"
    permission_classes = [IsAdminUser | ReadOnly]
