import concurrent

import pytest
from channels.testing import WebsocketCommunicator

from backend.groups.models import ChatGroup


pytestmark = [pytest.mark.asyncio, pytest.mark.django_db(transaction=True)]


@pytest.fixture
def request_data(group: ChatGroup) -> dict:
    return {
        "id": group.id,
    }


@pytest.fixture
def successed_response_data(group: ChatGroup) -> dict:
    return {
        "id": group.id
    }


@pytest.fixture
def filled_data(yml_dataset: dict, request_data: dict, successed_response_data: dict) -> dict:
    data = yml_dataset["test_delete_group_event"]
    data["request"]["data"] = request_data
    data["successed_response"]["data"] = successed_response_data
    return data


async def test_successed(filled_data: dict, auth_com: WebsocketCommunicator,
                         another_auth_com: WebsocketCommunicator):
    await auth_com.send_json_to(filled_data["request"])

    response = await auth_com.receive_json_from()
    assert filled_data["successed_response"] == response, response["data"]

    another_response = await another_auth_com.receive_json_from()
    assert filled_data["successed_response"] == another_response, another_response["data"]


async def test_group_does_not_exist(filled_data: dict, auth_com: WebsocketCommunicator,
                                    another_auth_com: WebsocketCommunicator):
    filled_data["request"]["data"]["id"] = 404

    await auth_com.send_json_to(filled_data["request"])

    response = await auth_com.receive_json_from()
    assert filled_data["group_does_not_exist_response"] == response, response["data"]

    with pytest.raises(concurrent.futures._base.TimeoutError):
        await another_auth_com.receive_json_from()
