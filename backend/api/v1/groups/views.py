from rest_framework import generics
from .serializers import (
    GroupSerializer,
    MemberSerializer,
)

from backend.groups.models import (
    ChatGroup, 
    GroupMembership,
)


class GroupListCreateView(generics.ListCreateAPIView):
    """ Create & List Groups """
    queryset = ChatGroup.objects.all()
    serializer_class = GroupSerializer


class GroupMembershipListCreateView(generics.ListCreateAPIView):
    """ Create & List Groups """
    queryset = GroupMembership.objects.all()
    serializer_class = MemberSerializer


class GroupRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    """ Get & Update & Delete Group """
    queryset = ChatGroup.objects.all()
    serializer_class = GroupSerializer
    lookup_url_kwarg = "slug"
    lookup_field = "slug"
