from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from backend.socket_chat.consumers.dialog import ChatConsumer

application = ProtocolTypeRouter({
    "websocket": URLRouter([
        path('ws/dialog/<int:dialog_id>', ChatConsumer)
    ])
})
