from rest_framework import generics

from backend.api.v1.groups.serializers import (
    GroupSerializer,
    MemberSerializer,
    GroupMessageSerializer,
)
from backend.groups.models import (
    ChatGroup,
    GroupMembership,
    GroupMessage,
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


class GroupMessageListCreateView(generics.ListCreateAPIView):
    """ Create & List Groups """
    queryset = GroupMessage.objects.all()
    serializer_class = GroupMessageSerializer
    filterset_fields = ['dialog', 'sender']


class GroupMessageRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    """ Get & Update & Delete Group """
    queryset = GroupMessage.objects.all()
    serializer_class = GroupMessageSerializer
