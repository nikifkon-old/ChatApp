import concurrent

import pytest
from channels.testing import WebsocketCommunicator
from django.contrib.auth import get_user_model

from backend.groups.models import GroupMessage


User = get_user_model()
pytestmark = [pytest.mark.asyncio, pytest.mark.django_db(transaction=True)]


@pytest.fixture
def filled_data(yml_dataset: dict, group_message: GroupMessage):
    data = yml_dataset["test_delete_message_in_group_event"]
    data["request_data"]["data"]["id"] = group_message.id
    data["successed_response"]["data"]["chat_id"] = group_message.group.id
    data["successed_response"]["data"]["message_id"] = group_message.id
    return data


async def test_succeessed(filled_data: dict, auth_com: WebsocketCommunicator, another_auth_com: WebsocketCommunicator):
    await auth_com.send_json_to(filled_data["request_data"])

    response = await auth_com.receive_json_from()
    assert filled_data["successed_response"] == response, response["data"]

    another_response = await another_auth_com.receive_json_from()
    assert filled_data["successed_response"] == another_response, another_response["data"]


async def test_message_does_not_exist(filled_data: dict, auth_com: WebsocketCommunicator, another_auth_com: WebsocketCommunicator,
                                      group_message: GroupMessage):
    filled_data["request_data"]["data"]["id"] = 404

    await auth_com.send_json_to(filled_data["request_data"])

    response = await auth_com.receive_json_from()
    assert filled_data["message_does_not_exist_response"] == response, response["data"]

    with pytest.raises(concurrent.futures._base.TimeoutError):
        await another_auth_com.receive_json_from()


async def test_delete_foreign_message(filled_data: dict, auth_com: WebsocketCommunicator, another_auth_com: WebsocketCommunicator,
                                      group_message: GroupMessage):
    await another_auth_com.send_json_to(filled_data["request_data"])

    another_response = await another_auth_com.receive_json_from()
    assert filled_data["message_is_foreign_response"] == another_response, another_response["data"]

    with pytest.raises(concurrent.futures._base.TimeoutError):
        await auth_com.receive_json_from()
