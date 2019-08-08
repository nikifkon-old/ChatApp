from django.urls import path, include

urlpatterns = [
    path('profile/', include('backend.api.v1.profiles.urls')),
    path('group/', include('backend.api.v1.groups.urls')),
    path('message/', include('backend.api.v1.chat_messages.urls')),
]