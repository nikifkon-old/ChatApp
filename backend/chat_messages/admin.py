from django.contrib import admin
from .models import GroupMessage, DialogMessage, GroupMessageInfo

admin.site.register(GroupMessage)
admin.site.register(DialogMessage)
admin.site.register(GroupMessageInfo)
