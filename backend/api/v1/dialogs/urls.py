from django.urls import path
from .views import (
    DialogListCreateView,
    DialogRetrieveUpdateDestroyAPIView,
    DialogMembershipListCreateView,
    DialogMessageListCreateView,
    DialogMessageRetrieveUpdateDestroyAPIView,
)

urlpatterns = [
    path('', DialogListCreateView.as_view()),
    path('<int:pk>', DialogRetrieveUpdateDestroyAPIView.as_view()),
    path('membership/', DialogMembershipListCreateView.as_view()),
    path('messages/', DialogMessageListCreateView.as_view()),
    path('messages/<int:pk>', DialogMessageRetrieveUpdateDestroyAPIView.as_view()),
]
