from json import JSONDecodeError

import pytest
from channels.testing import WebsocketCommunicator

from config.asgi import application

pytestmark = [pytest.mark.asyncio]


async def test_connect(ws_url):
    communicator = WebsocketCommunicator(application, ws_url)
    connected, _ = await communicator.connect()
    assert connected
    await communicator.disconnect()


async def test_send_plain_text(yml_dataset, com: WebsocketCommunicator):
    await com.send_to(yml_dataset['test_send_plain_text']['request_data'])
    with pytest.raises(JSONDecodeError):
        await com.receive_from()


async def test_invalid_format(yml_dataset, com: WebsocketCommunicator, error_status):
    test_data = yml_dataset['test_invalid_format']

    await com.send_json_to(test_data['request_data'])
    response = await com.receive_json_from()
    assert response
    assert response["status"] == error_status
    assert response["data"] == test_data['expected_response']


async def test_must_auth(yml_dataset, com: WebsocketCommunicator, error_status):
    test_data = yml_dataset['test_must_auth']

    await com.send_json_to(test_data['request_data'])
    response = await com.receive_json_from()
    assert response
    assert response["status"] == error_status
    assert response["data"] == test_data['expected_response']
