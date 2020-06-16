from django.urls import path, include

urlpatterns = [
    path('users/', include('backend.api.v2.users.urls')),
]
