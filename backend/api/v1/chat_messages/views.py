from rest_framework import generics
from .serializers import (
    GroupMessageSerializer,
    DialogMessageSerializer,
)

from backend.chat_messages.models import (
    GroupMessage,
    DialogMessage,
)


class GroupMessageListCreateView(generics.ListCreateAPIView):
    """ Create & List Groups """
    queryset = GroupMessage.objects.all()
    serializer_class = GroupMessageSerializer
    filterset_fields = ['dialog', 'sender']


class GroupMessageRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    """ Get & Update & Delete Group """
    queryset = GroupMessage.objects.all()
    serializer_class = GroupMessageSerializer


class DialogMessageListCreateView(generics.ListCreateAPIView):
    """ Create & List Groups """
    queryset = DialogMessage.objects.all()
    serializer_class = DialogMessageSerializer
    filterset_fields = ['dialog', 'sender']


class DialogMessageRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    """ Get & Update & Delete Group """
    queryset = DialogMessage.objects.all()
    serializer_class = DialogMessageSerializer