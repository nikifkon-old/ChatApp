from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static


media = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
static = static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('accounts/', include('allauth.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    re_path('(^$)|(login)|(get-started)', 
        TemplateView.as_view(template_name="index.html")),

] + media + static