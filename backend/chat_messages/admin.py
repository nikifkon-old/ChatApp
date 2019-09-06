from django.contrib import admin
from .models import GroupMessage
from .models import DialogMessage

admin.site.register(GroupMessage)
admin.site.register(DialogMessage)