from django.urls import include, path

urlpatterns = [
    path('api/v2/', include('backend.api.v2.urls'))
]
