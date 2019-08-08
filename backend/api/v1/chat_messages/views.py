from rest_framework import generics
from .serializers import MessageSerializer

from backend.chat_messages.models import Message


class MessageListCreateView(generics.ListCreateAPIView):
    """ Create & List Groups """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class MessageRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    """ Get & Update & Delete Group """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    lookup_url_kwarg = "id"
    lookup_field = "id"
