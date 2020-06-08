import concurrent

import pytest
from channels.testing import WebsocketCommunicator

from backend.groups.models import ChatGroup


pytestmark = [pytest.mark.asyncio, pytest.mark.django_db(transaction=True)]


@pytest.fixture
def filled_data(yml_dataset: dict, group: ChatGroup) -> dict:
    data = yml_dataset["test_delete_group_event"]
    data["request_data"]["data"]["id"] = group.id
    data["successed_response"]["data"]["id"] = group.id
    return data


async def test_successed(filled_data: dict, auth_com: WebsocketCommunicator,
                         another_auth_com: WebsocketCommunicator):
    await auth_com.send_json_to(filled_data["request_data"])

    response = await auth_com.receive_json_from()
    assert filled_data["successed_response"] == response, response["data"]

    another_response = await another_auth_com.receive_json_from()
    assert filled_data["successed_response"] == another_response, another_response["data"]


async def test_group_does_not_exist(filled_data: dict, auth_com: WebsocketCommunicator,
                                    another_auth_com: WebsocketCommunicator):
    filled_data["request_data"]["data"]["id"] = 404

    await auth_com.send_json_to(filled_data["request_data"])

    response = await auth_com.receive_json_from()
    assert filled_data["group_does_not_exist_response"] == response, response["data"]

    with pytest.raises(concurrent.futures._base.TimeoutError):
        await another_auth_com.receive_json_from()
