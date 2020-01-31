import pytest
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import AccessToken
from channels.testing import WebsocketCommunicator


User = get_user_model()


@pytest.mark.asyncio
async def test_auth_empty_data(com: WebsocketCommunicator):
    await com.send_json_to({'event': 'authenticate', 'data': {}})
    response = await com.receive_json_from()
    assert response["status"] == "error"
    assert response["data"] == {'detail': 'Access token must not be empty'}
    await com.disconnect()


@pytest.mark.asyncio
async def test_auth_invalid_token(com: WebsocketCommunicator):
    token = "test"
    await com.send_json_to({'event': 'authenticate',
                           'data': {'access_token': token}})
    response = await com.receive_json_from()
    assert response["status"] == "error"
    assert response["data"] == {'detail': 'Token is not valid'}
    await com.disconnect()
