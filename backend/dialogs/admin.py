from django.contrib import admin
from .models import Dialog
from .models import DialogMembership

admin.site.register(Dialog)
admin.site.register(DialogMembership)