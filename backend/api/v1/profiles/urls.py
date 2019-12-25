from django.urls import path
from backend.api.v1.profiles.views import (
    ProfileListCreateView,
    ProfileRetrieveUpdateDestroyAPIView
)

urlpatterns = [
    path('', ProfileListCreateView.as_view()),
    path('<id>', ProfileRetrieveUpdateDestroyAPIView.as_view()),
]
