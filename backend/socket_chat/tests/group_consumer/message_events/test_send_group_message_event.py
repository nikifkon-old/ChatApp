from datetime import datetime
import pytest
from channels.testing import WebsocketCommunicator
from django.contrib.auth import get_user_model

from backend.groups.models import ChatGroup


User = get_user_model()
pytestmark = [pytest.mark.asyncio, pytest.mark.django_db(transaction=True)]


@pytest.fixture
def filled_data(yml_dataset: dict, group: ChatGroup, group_message_sender, message_text: str) -> dict:
    data = yml_dataset["test_send_message_in_group_event"]
    data["request_data"]["data"]["id"] = group.id
    data["request_data"]["data"]["text"] = message_text

    data["successed_response_for_another_user"]["data"]["sender"] = group_message_sender
    data["successed_response_for_user"]["data"]["sender"] = group_message_sender

    data["successed_response_for_another_user"]["data"]["chat_id"] = group.id
    data["successed_response_for_user"]["data"]["chat_id"] = group.id
    data["successed_response_for_another_user"]["data"]["date"] = datetime.utcnow().strftime("%Y-%m-%dT%H:%MZ")
    data["successed_response_for_user"]["data"]["date"] = datetime.utcnow().strftime("%Y-%m-%dT%H:%MZ")
    return data


async def test_successed(filled_data: dict, auth_com: WebsocketCommunicator, another_auth_com: WebsocketCommunicator, ok_status: str):
    await auth_com.send_json_to(filled_data["request_data"])

    response = await auth_com.receive_json_from()
    assert response["status"] == ok_status, response["data"]
    first_message_id = response["data"].pop("id")
    # round to minutes
    date = response["data"]["date"]
    response["data"]["date"] = datetime.strptime(date, "%Y-%m-%dT%H:%M:%S.%fZ").strftime("%Y-%m-%dT%H:%MZ")
    assert filled_data["successed_response_for_user"] == response, response["data"]

    another_response = await another_auth_com.receive_json_from()
    second_message_id = another_response["data"].pop("id")
    # round to minutes
    another_date = another_response["data"]["date"]
    another_response["data"]["date"] = datetime.strptime(another_date, "%Y-%m-%dT%H:%M:%S.%fZ").strftime("%Y-%m-%dT%H:%MZ")
    assert filled_data["successed_response_for_another_user"] == another_response, another_response["data"]

    assert first_message_id == second_message_id, "Message ids must be equal"
