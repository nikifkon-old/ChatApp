from json import JSONDecodeError
import pytest
from channels.testing import WebsocketCommunicator
from config.asgi import application


@pytest.mark.asyncio
async def test_connect():
    communicator = WebsocketCommunicator(application, 'ws/main/')
    connected, _ = await communicator.connect()
    assert connected
    await communicator.disconnect()


@pytest.mark.asyncio
async def test_send_plain_text(com):
    await com.send_to('invalid text')
    with pytest.raises(JSONDecodeError):
        await com.receive_from()


@pytest.mark.asyncio
async def test_invalid_format(com):
    await com.send_json_to({'test': 'test'})
    response = await com.receive_json_from()
    assert response
    assert response["status"] == "error"
    assert response["data"] == {'detail': 'Invalid format'}


@pytest.mark.asyncio
async def test_must_auth(com):
    await com.send_json_to({'event': 'dialogs.list', 'data': {}})
    response = await com.receive_json_from()
    assert response
    assert response["status"] == 'error'
    assert response["data"] == {'detail': 'You must be authenticated'}
