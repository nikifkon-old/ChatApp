from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from backend.socket_chat.consumers.dialog import ChatConsumer

from config.token_auth import TokenAuthMiddlewareStack


application = ProtocolTypeRouter({
    "websocket": TokenAuthMiddlewareStack(
        URLRouter([
            path('ws/dialog/<int:dialog_id>', ChatConsumer)
        ])
    )
})
