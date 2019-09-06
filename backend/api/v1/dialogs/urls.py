from django.urls import path
from .views import (
    DialogListCreateView,
    DialogRetrieveUpdateDestroyAPIView,
    DialogMembershipListCreateView
)

urlpatterns = [
    path('', DialogListCreateView.as_view()),
    path('<int:pk>', DialogRetrieveUpdateDestroyAPIView.as_view()),
    path('membership/', DialogMembershipListCreateView.as_view()),
]