from django.urls import path
from .views import (
    ProfileListCreateView,
    ProfileRetrieveUpdateDestroyAPIView
)

urlpatterns = [
    path('', ProfileListCreateView.as_view()),
    path('<id>', ProfileRetrieveUpdateDestroyAPIView.as_view()),
]