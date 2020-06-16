from datetime import datetime

import pytest
from channels.testing import WebsocketCommunicator
from django.contrib.auth import get_user_model

from backend.dialogs.models import Dialog
from backend.socket_chat.tests.utils import round_to_minutes


User = get_user_model()
pytestmark = [pytest.mark.asyncio, pytest.mark.django_db(transaction=True)]


@pytest.fixture
def request_data(dialog: Dialog, message_text: str) -> dict:
    return {
        "id": dialog.id,
        "text": message_text
    }


@pytest.fixture
def successed_response_data(dialog_message_sender: dict, dialog: Dialog, message_text: str) -> dict:
    return {
        "sender": dialog_message_sender,
        "chat_id": dialog.id,
        "text": message_text,
        "unread": False,
        "stared": False,
        "date": datetime.utcnow().strftime("%Y-%m-%dT%H:%MZ")
    }


@pytest.fixture
def filled_data(yml_dataset: dict, request_data: dict, successed_response_data: dict) -> dict:
    data = yml_dataset["test_send_message_in_dialog_event"]
    data["request"]["data"] = request_data
    data["successed_response"]["data"] = successed_response_data
    return data


@pytest.fixture
def assert_successed_response_for_user(ok_status: str, filled_data: dict, dialog_message_sender: dict):
    def do_assert(response, user) -> int:
        assert response["status"] == ok_status, response["data"]
        message_id = response["data"].pop("id")
        response["data"]["date"] = round_to_minutes(response["data"]["date"])
        if user.id != dialog_message_sender["id"]:
            filled_data["successed_response"]["data"]["unread"] = True
        assert filled_data["successed_response"] == response, response["data"]
        return message_id
    return do_assert


async def test_successed(filled_data: dict, auth_com: WebsocketCommunicator,
                         another_auth_com: WebsocketCommunicator, ok_status: str,
                         assert_successed_response_for_user,
                         user: User, another_user: User):
    await auth_com.send_json_to(filled_data["request"])

    response = await auth_com.receive_json_from()
    first_message_id = assert_successed_response_for_user(response, user)

    another_response = await another_auth_com.receive_json_from()
    second_message_id = assert_successed_response_for_user(another_response, another_user)

    assert first_message_id == second_message_id, "Message ids must be equal"
