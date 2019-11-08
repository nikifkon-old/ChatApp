import pytest
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import AccessToken
from channels.testing import WebsocketCommunicator

from config.routing import application
from backend.dialogs.models import Dialog

User = get_user_model()

DIALOG_URL = 'ws/dialogs/'

async def connect():
    com = WebsocketCommunicator(application, DIALOG_URL)
    connected = await com.connect()
    return com

@pytest.mark.asyncio
async def test_connect():
    com = WebsocketCommunicator(application, DIALOG_URL) 
    connected, subprotocol = await com.connect()
    assert connected

    await com.disconnect()

@pytest.mark.asyncio
async def test_need_auth():
    com = await connect()
    
    data = {
        "event": "dialogs.list",
        "data": {} 
    }
    await com.send_json_to(data)

    response = await com.receive_json_from()
    assert isinstance(response, dict)
    assert response['status'] == 'error'
    assert response['data']['detail'] == 'You must be authenticated'
    
    await com.disconnect()

async def connect_and_auth():
    com = await connect()
    user = User.objects.create(username="test user", password="test password")
    access_token = AccessToken.for_user(user)
    data = {
        "event": "authenticate",
        "data": {
          "access_token": str(access_token)
        }
    }
    await com.send_json_to(data)
    response = await com.receive_json_from()
    assert response['status'] == 'ok'
    assert response['data']['detail'] == 'Authorization successed'

    return com
