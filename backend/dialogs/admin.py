from django.contrib import admin
from .models import (
    Dialog,
    DialogMembership,
    DialogMessage,
    DialogMessageInfo,
)

admin.site.register(Dialog)
admin.site.register(DialogMembership)
admin.site.register(DialogMessage)
admin.site.register(DialogMessageInfo)
