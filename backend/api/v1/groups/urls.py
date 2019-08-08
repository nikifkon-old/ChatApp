from django.urls import path
from .views import (
    GroupListCreateView,
    GroupRetrieveUpdateDestroyAPIView
)

urlpatterns = [
    path('', GroupListCreateView.as_view()),
    path('<str:slug>', GroupRetrieveUpdateDestroyAPIView.as_view()),
]