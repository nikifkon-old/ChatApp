from rest_framework import generics
from .serializers import ProfileSerializer

from backend.profiles.models import Profile


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
