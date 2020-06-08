import concurrent
from datetime import datetime

import pytest
from channels.testing import WebsocketCommunicator
from django.contrib.auth import get_user_model

from backend.groups.models import GroupMessage


User = get_user_model()
pytestmark = [pytest.mark.asyncio, pytest.mark.django_db(transaction=True)]


@pytest.fixture
def filled_data(yml_dataset: dict, group_message: GroupMessage, group_message_sender):
    data = yml_dataset["test_update_message_in_group_event"]
    data["request_data"]["data"]["id"] = group_message.id

    data["successed_response"]["data"]["sender"] = group_message_sender

    data["successed_response"]["data"]["id"] = group_message.id
    data["successed_response"]["data"]["chat_id"] = group_message.group.id
    data["successed_response"]["data"]["date"] = datetime.utcnow().strftime("%Y-%m-%dT%H:%MZ")
    return data


async def test_succeessed(filled_data: dict, auth_com: WebsocketCommunicator, another_auth_com: WebsocketCommunicator, ok_status: str):
    await auth_com.send_json_to(filled_data["request_data"])

    response = await auth_com.receive_json_from()
    assert response["status"] == ok_status, response["data"]
    # round to minutes
    date = response["data"]["date"]
    response["data"]["date"] = datetime.strptime(date, "%Y-%m-%dT%H:%M:%S.%fZ").strftime("%Y-%m-%dT%H:%MZ")
    assert filled_data["successed_response"] == response, response["data"]

    another_response = await another_auth_com.receive_json_from()
    # round to minutes
    date = another_response["data"]["date"]
    another_response["data"]["date"] = datetime.strptime(date, "%Y-%m-%dT%H:%M:%S.%fZ").strftime("%Y-%m-%dT%H:%MZ")
    assert filled_data["successed_response"] == another_response, another_response["data"]


async def test_message_does_not_exist(filled_data: dict, auth_com: WebsocketCommunicator, another_auth_com: WebsocketCommunicator):
    filled_data["request_data"]["data"]["id"] = 404

    await auth_com.send_json_to(filled_data["request_data"])

    response = await auth_com.receive_json_from()
    assert filled_data["message_does_not_exist_response"] == response, response["data"]

    with pytest.raises(concurrent.futures._base.TimeoutError):
        await another_auth_com.receive_json_from()


async def test_message_is_foreign(filled_data: dict, auth_com: WebsocketCommunicator,
                                  another_auth_com: WebsocketCommunicator, group_message: GroupMessage):
    await another_auth_com.send_json_to(filled_data["request_data"])

    another_response = await another_auth_com.receive_json_from()
    assert filled_data["message_is_foreign_response"] == another_response, another_response["data"]

    with pytest.raises(concurrent.futures._base.TimeoutError):
        await auth_com.receive_json_from()
