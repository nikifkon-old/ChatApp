from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from backend.socket_chat.consumers.group import GroupConsumer
from backend.socket_chat.consumers.dialog import DialogConsumer

application = ProtocolTypeRouter({
    "websocket": URLRouter([
        path('ws/dialogs/', DialogConsumer),
        path('ws/groups/', GroupConsumer),
    ])
})
