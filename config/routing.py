from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from backend.socket_chat.consumers.main import MainConsumer

application = ProtocolTypeRouter({
    "websocket": URLRouter([
        path('ws/main/', MainConsumer),
    ])
})
