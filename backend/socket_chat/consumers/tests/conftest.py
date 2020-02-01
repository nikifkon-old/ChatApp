import pytest
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import AccessToken
from channels.testing import WebsocketCommunicator
from channels.consumer import AsyncConsumer
from config.asgi import application


User = get_user_model()
WS_URL = 'ws/main/'


@pytest.fixture
async def com() -> WebsocketCommunicator:
    communicator = WebsocketCommunicator(application, WS_URL)
    connected, _ = await communicator.connect()
    assert connected
    return communicator


@pytest.fixture
@pytest.mark.django_db
async def auth_com(com) -> WebsocketCommunicator:
    user = User.objects.create(username="test_user", password="test_password")
    access_token = AccessToken.for_user(user)
    await com.send_json_to({'event': 'authenticate',
                           'data': {'access_token': str(access_token)}})
    response = await com.receive_json_from()
    assert response["status"] == "ok"
    assert response["data"] == {'detail': 'Authorization successed'}
    return com


@pytest.fixture
async def consumer() -> AsyncConsumer:
    return application.application_mapping['websocket'].routes[0].resolve(WS_URL).func
