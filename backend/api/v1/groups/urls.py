from django.urls import path
from .views import (
    GroupListCreateView,
    GroupRetrieveUpdateDestroyAPIView,
    GroupMembershipListCreateView,
)

urlpatterns = [
    path('', GroupListCreateView.as_view()),
    path('<str:slug>', GroupRetrieveUpdateDestroyAPIView.as_view()),
    path('membership/', GroupMembershipListCreateView.as_view()),
]