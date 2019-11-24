from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
import backend.urls

BACKEND = backend.urls.urlpatterns
MEDIA = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
STATIC = static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
REACT = re_path('^(?:.*)/?$', TemplateView.as_view(template_name="index.html"))

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('accounts/', include('allauth.urls')),
    path('auth/', include('djoser.urls')),
    path('token-auth/', include('djoser.urls.jwt')),
] + BACKEND + MEDIA + STATIC

urlpatterns += [
    REACT
]
