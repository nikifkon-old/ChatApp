from rest_framework import generics
from .serializers import GroupSerializer

from backend.groups.models import ChatGroup


class GroupListCreateView(generics.ListCreateAPIView):
    """ Create & List Groups """
    queryset = ChatGroup.objects.all()
    serializer_class = GroupSerializer


class GroupRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    """ Get & Update & Delete Group """
    queryset = ChatGroup.objects.all()
    serializer_class = GroupSerializer
    lookup_url_kwarg = "slug"
    lookup_field = "slug"
