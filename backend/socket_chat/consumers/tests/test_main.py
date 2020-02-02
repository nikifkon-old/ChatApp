import pytest
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import AccessToken
from channels.testing import WebsocketCommunicator
from pytest_mock import MockFixture


User = get_user_model()
pytestmark = [pytest.mark.asyncio]


async def test_auth_empty_data(com: WebsocketCommunicator):
    await com.send_json_to({'event': 'authenticate', 'data': {}})
    response = await com.receive_json_from()
    assert response["status"] == "error"
    assert response["data"] == {'detail': 'Access token must not be empty'}


async def test_auth_invalid_token(com: WebsocketCommunicator):
    token = "test"
    await com.send_json_to({'event': 'authenticate',
                           'data': {'access_token': token}})
    response = await com.receive_json_from()
    assert response["status"] == "error"
    assert response["data"] == {'detail': 'Token is not valid'}


@pytest.mark.django_db
async def test_auth_valid_token(com: WebsocketCommunicator):
    user = User.objects.create(username="test_user", password="test_password")
    access_token = AccessToken.for_user(user)
    await com.send_json_to({'event': 'authenticate',
                           'data': {'access_token': str(access_token)}})
    response = await com.receive_json_from(timeout=100)
    assert response["status"] == "ok"
    assert response["data"] == {'detail': 'Authorization successed'}


@pytest.mark.django_db
async def test_auth_expired_token(com: WebsocketCommunicator):
    user = User.objects.create(username="test_user", password="test_password")
    access_token = AccessToken.for_user(user)
    lst = list(str(access_token))
    lst[15] = lst[15].swapcase()
    access_token = ''.join(lst)
    await com.send_json_to({'event': 'authenticate',
                           'data': {'access_token': access_token}})
    response = await com.receive_json_from()
    assert response["status"] == "error"
    assert response["data"] == {'detail': 'Token is not valid'}


@pytest.mark.django_db
async def test_on_authenticate(com: WebsocketCommunicator, consumer, mocker: MockFixture):
    on_auth = mocker.spy(consumer, 'on_authenticate_success')
    await test_auth_valid_token(com)
    on_auth.assert_called_once()


async def test_recieve_json_undefined_method(com: WebsocketCommunicator):
    await com.send_json_to({'event': 'some_undefined_event', 'data': {}})
    response = await com.receive_json_from()
    assert response["status"] == "error"
    assert response["event"] == "some_undefined_event"
    assert response["data"] == {'detail': 'Undefined event'}
