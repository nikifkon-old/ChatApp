from django.urls import path
from .views import (
    MessageListCreateView,
    MessageRetrieveUpdateDestroyAPIView
)

urlpatterns = [
    path('', MessageListCreateView.as_view()),
    path('<int:id>', MessageRetrieveUpdateDestroyAPIView.as_view()),
]