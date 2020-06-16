from copy import deepcopy

import pytest
from channels.testing import WebsocketCommunicator

from backend.dialogs.models import DialogMessage
from backend.socket_chat.tests.utils import round_to_minutes


pytestmark = [pytest.mark.asyncio, pytest.mark.django_db(transaction=True)]


@pytest.fixture
def dialog_last_message(dialog_message_data: dict) -> dict:
    return {
        "sender": dialog_message_data["sender"]["id"],
        "text": dialog_message_data["text"],
        "date": dialog_message_data["date"]
    }


@pytest.fixture
def request_data() -> dict:
    return {}


@pytest.fixture
def successed_response_data(dialog_data_for_user: dict) -> dict:
    return [dialog_data_for_user]


@pytest.fixture
def filled_data(yml_dataset: dict, dialog_message: DialogMessage, successed_response_data: dict):
    data = yml_dataset["test_list_dialog_event"]
    data["successed_response"]["data"] = successed_response_data
    data["successed_response_without_chats"] = deepcopy(data["successed_response"])
    data["successed_response_without_chats"]["data"] = []
    return data


@pytest.fixture
def assert_custom_response(ok_status: str):
    def do_assert(response, expected_response) -> int:
        assert response["status"] == ok_status, response["data"]
        for dialog in response["data"]:
            for message in dialog["messages"]:
                message["date"] = round_to_minutes(message["date"])
            dialog["last_message"]["date"] = round_to_minutes(dialog["last_message"]["date"])
        assert expected_response == response, response["data"]
    return do_assert


async def test_successed(filled_data: dict, auth_com: WebsocketCommunicator, assert_custom_response):
    await auth_com.send_json_to(filled_data["request"])
    response = await auth_com.receive_json_from()
    assert_custom_response(response, filled_data["successed_response"])


# The list method with a filter should not return dialogs without messages that match the filter
async def test_stared_filtering(filled_data: dict, auth_com: WebsocketCommunicator, assert_custom_response):
    request_with_stared_filter = filled_data["request"]
    request_with_stared_filter["data"]["filter"] = "stared"

    await auth_com.send_json_to(request_with_stared_filter)
    response = await auth_com.receive_json_from()
    assert_custom_response(response, filled_data["successed_response_without_chats"])


async def test_unread_filtering(filled_data: dict, auth_com: WebsocketCommunicator, assert_custom_response):
    request_with_unread_filter = filled_data["request"]
    request_with_unread_filter["data"]["filter"] = "unread"

    await auth_com.send_json_to(request_with_unread_filter)
    response = await auth_com.receive_json_from()
    assert_custom_response(response, filled_data["successed_response_without_chats"])
