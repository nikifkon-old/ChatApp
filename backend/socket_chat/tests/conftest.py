import os

import pytest
import yaml
from channels.consumer import AsyncConsumer
from channels.testing import WebsocketCommunicator
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import AccessToken

from config.asgi import application

User = get_user_model()


@pytest.fixture
def ws_url():
    return 'ws/main/'


@pytest.fixture
def yml_dataset() -> dict:
    dirname = os.path.abspath(os.path.dirname(__file__))
    with open(os.path.join(dirname, 'dataset.yml')) as file:
        return yaml.safe_load(file)


@pytest.yield_fixture
async def com(ws_url) -> WebsocketCommunicator:
    communicator = WebsocketCommunicator(application, ws_url)
    connected, _ = await communicator.connect()
    assert connected
    yield communicator
    try:
        await communicator.disconnect()
    except Exception:
        pass


@pytest.fixture
def user():
    return User.objects.create(username="test_user", password="test_password")


@pytest.fixture
def access_token(user):
    return AccessToken.for_user(user)


@pytest.fixture
def auth_request():
    def func(access_token):
        return {"event": "authenticate", "data": {"access_token": access_token}}
    return func


@pytest.fixture
async def auth_com(com, access_token, yml_dataset) -> WebsocketCommunicator:
    await com.send_json_to({'event': 'authenticate',
                           'data': {'access_token': str(access_token)}})
    response = await com.receive_json_from()
    assert response["status"] == yml_dataset['ok_status']
    return com


@pytest.fixture
def consumer(ws_url) -> AsyncConsumer:
    return application.application_mapping['websocket']\
        .routes[0].resolve(ws_url).func
