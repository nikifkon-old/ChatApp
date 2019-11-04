import pytest
from channels.testing import WebsocketCommunicator

from rest_framework.test import RequestsClient
from config.routing import application


DIALOG_URL = 'ws/dialogs/'
TEST_SERVER = 'http://127.0.0.1:8000'

async def connect(url):
    communicator = WebsocketCommunicator(application, url)
    connected = await communicator.connect()
    assert connected
    return communicator

@pytest.mark.asyncio
async def test_need_authenticate():
    communicator = await connect(DIALOG_URL)
    await communicator.send_json_to({
        'event': 'dialogs.list',
        'data': {}
    })
    response = await communicator.receive_json_from()
    assert response == {
        'status': 'error',
        'event': 'dialogs.list',
        'data': {
            'detail': 'You must be authenticated'
        }
    }

    await communicator.disconnect()

@pytest.mark.django_db
def get_access_token():
    client = RequestsClient()
    response = client.post('%s/token-auth/jwt/create' % TEST_SERVER, json={
        'username': 'amdin',
        'password': 'default123'
    })
    assert response.status_code == 200
    token = response.data.get('access')
    return token

@pytest.mark.django_db
@pytest.mark.asyncio
async def test_authenticate_event():
    token = get_access_token()
    communicator = await connect(DIALOG_URL)
    await communicator.send_json_to({
        'event': 'authenticate',
        'data': {
            'access_token': token
        }
    })
    response = await communicator.receive_json_from()
    assert response['status'] == 200
    