from django.contrib import admin
from .models import ChatGroup, GroupMembership


admin.site.register(ChatGroup)
admin.site.register(GroupMembership)