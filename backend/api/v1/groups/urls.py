from django.urls import path
from .views import (
    GroupListCreateView,
    GroupRetrieveUpdateDestroyAPIView,
    GroupMembershipListCreateView,
    GroupMessageListCreateView,
    GroupMessageRetrieveUpdateDestroyAPIView,
)

urlpatterns = [
    path('', GroupListCreateView.as_view()),
    path('<str:slug>', GroupRetrieveUpdateDestroyAPIView.as_view()),
    path('membership/', GroupMembershipListCreateView.as_view()),
    path('messages/', GroupMessageListCreateView.as_view()),
    path('messages/<int:pk>', GroupMessageRetrieveUpdateDestroyAPIView.as_view()),
]
