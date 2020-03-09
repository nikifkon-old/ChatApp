from django.urls import path

from backend.api.v1.users.views import (UserListCreateView,
                                        UserRetrieveUpdateDestroyAPIView)

urlpatterns = [
    path('', UserListCreateView.as_view()),
    path('<id>', UserRetrieveUpdateDestroyAPIView.as_view()),
]
