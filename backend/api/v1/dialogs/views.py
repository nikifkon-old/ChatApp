from rest_framework import generics
from .serializers import DialogSerializer, DialogMemberSerializer

from backend.dialogs.models import Dialog, DialogMembership


class DialogListCreateView(generics.ListCreateAPIView):
    """ Create & List Groups """
    queryset = Dialog.objects.all()
    serializer_class = DialogSerializer


class DialogRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    """ Get & Update & Delete Group """
    queryset = Dialog.objects.all()
    serializer_class = DialogSerializer

class DialogMembershipListCreateView(generics.ListCreateAPIView):
    """ Join in dialogs """
    queryset = DialogMembership.objects.all()
    serializer_class = DialogMemberSerializer