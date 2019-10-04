from rest_framework import generics
from .serializers import (
    DialogSerializer,
    DialogMemberSerializer,
    DialogMessageSerializer,
)

from backend.dialogs.models import (
    Dialog,
    DialogMembership,
    DialogMessage,
)


class DialogListCreateView(generics.ListCreateAPIView):
    """ Create & List Dialogs """
    serializer_class = DialogSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        if user_id:
            return Dialog.objects.filter(members=user_id)
        else:
            return Dialog.objects.all()


class DialogRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    """ Get & Update & Delete Dialogs """
    queryset = Dialog.objects.all()
    serializer_class = DialogSerializer


class DialogMembershipListCreateView(generics.ListCreateAPIView):
    """ Join in dialogs """
    queryset = DialogMembership.objects.all()
    serializer_class = DialogMemberSerializer


class DialogMessageListCreateView(generics.ListCreateAPIView):
    """ Create & List Dialog's messages """
    queryset = DialogMessage.objects.all()
    serializer_class = DialogMessageSerializer
    filterset_fields = ['dialog', 'sender']


class DialogMessageRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    """ Get & Update & Delete Dialog's messages """
    queryset = DialogMessage.objects.all()
    serializer_class = DialogMessageSerializer
