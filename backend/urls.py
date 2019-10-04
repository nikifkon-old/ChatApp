from django.urls import path, include

urlpatterns = [
    path('api/v1/', include('backend.api.v1.urls'))
]
