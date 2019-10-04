from django.contrib import admin
from .models import (
    ChatGroup,
    GroupMembership,
    GroupMessage,
    GroupMessageInfo,
)


admin.site.register(ChatGroup)
admin.site.register(GroupMembership)
admin.site.register(GroupMessage)
admin.site.register(GroupMessageInfo)
