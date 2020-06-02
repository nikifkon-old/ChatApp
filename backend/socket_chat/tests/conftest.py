import pytest
from channels.testing import WebsocketCommunicator
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import AccessToken

from config.asgi import application


User = get_user_model()


@pytest.fixture
def ws_url() -> str:
    return 'ws/main/'


@pytest.fixture
def ok_status() -> str:
    return 'ok'


@pytest.fixture
def error_status() -> str:
    return 'error'


@pytest.fixture
async def com(ws_url: str) -> WebsocketCommunicator:
    communicator = WebsocketCommunicator(application, ws_url)
    connected, _ = await communicator.connect()
    assert connected
    yield communicator
    try:
        await communicator.disconnect()
    except Exception:
        pass


@pytest.fixture
async def another_com(ws_url: str) -> WebsocketCommunicator:
    communicator = WebsocketCommunicator(application, ws_url)
    connected, _ = await communicator.connect()
    assert connected
    yield communicator
    try:
        await communicator.disconnect()
    except Exception:
        pass


@pytest.fixture
def access_token():
    def func(user: User) -> str:
        return str(AccessToken.for_user(user))
    return func


@pytest.fixture
def auth_request():
    def func(access_token: str):
        return {"event": "authenticate", "data": {"access_token": access_token}}
    return func


@pytest.fixture
async def auth_com(com: WebsocketCommunicator, access_token, user,
                   ok_status: str, auth_request) -> WebsocketCommunicator:
    await com.send_json_to(auth_request(access_token(user)))
    response = await com.receive_json_from()
    assert response["status"] == ok_status
    yield com


@pytest.fixture
async def another_auth_com(another_com: WebsocketCommunicator, auth_request,
                           access_token, ok_status: str, another_user: User) -> WebsocketCommunicator:
    await another_com.send_json_to(auth_request(access_token(another_user)))
    response = await another_com.receive_json_from()
    assert response["status"] == ok_status
    yield another_com
