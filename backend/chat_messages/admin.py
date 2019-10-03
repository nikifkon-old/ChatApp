from django.contrib import admin
from .models import (
    GroupMessage,
    DialogMessage,
    GroupMessageInfo,
    DialogMessageInfo
)

admin.site.register(GroupMessage)
admin.site.register(DialogMessage)
admin.site.register(DialogMessageInfo)
admin.site.register(GroupMessageInfo)
