from django.urls import path, include

urlpatterns = [
    path('users/', include('backend.api.v1.users.urls')),
    path('group/', include('backend.api.v1.groups.urls')),
    path('dialog/', include('backend.api.v1.dialogs.urls')),
]
