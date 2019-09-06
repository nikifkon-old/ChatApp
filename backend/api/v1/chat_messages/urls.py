from django.urls import path
from .views import (
    GroupMessageListCreateView,
    GroupMessageRetrieveUpdateDestroyAPIView,
    DialogMessageListCreateView,
    DialogMessageRetrieveUpdateDestroyAPIView,
)

urlpatterns = [
    path('group/', GroupMessageListCreateView.as_view()),
    path('group/<int:pk>', GroupMessageRetrieveUpdateDestroyAPIView.as_view()),
    path('dialog/', DialogMessageListCreateView.as_view()),
    path('dialog/<int:pk>', DialogMessageRetrieveUpdateDestroyAPIView.as_view()),
]