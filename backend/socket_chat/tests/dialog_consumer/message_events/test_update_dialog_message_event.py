import concurrent

import pytest
from channels.testing import WebsocketCommunicator
from django.contrib.auth import get_user_model

from backend.dialogs.models import DialogMessage
from backend.socket_chat.tests.utils import round_to_minutes


User = get_user_model()
pytestmark = [pytest.mark.asyncio, pytest.mark.django_db(transaction=True)]


@pytest.fixture
def message_text() -> str:
    return "new_text"


@pytest.fixture
def request_data(dialog_message: DialogMessage, message_text: str) -> dict:
    return {
        "id": dialog_message.id,
        "text": message_text
    }


@pytest.fixture
def successed_response_data(dialog_message_data: dict) -> dict:
    return dialog_message_data


@pytest.fixture
def filled_data(yml_dataset: dict, request_data: dict, successed_response_data: dict):
    data = yml_dataset["test_update_message_in_dialog_event"]
    data["request"]["data"] = request_data
    data["successed_response"]["data"] = successed_response_data
    return data


@pytest.fixture
def assert_successed_response(ok_status: str, filled_data: dict):
    def do_assert(response):
        assert response["status"] == ok_status, response["data"]
        response["data"]["date"] = round_to_minutes(response["data"]["date"])
        assert filled_data["successed_response"] == response, response["data"]
    return do_assert


async def test_succeessed(filled_data: dict, auth_com: WebsocketCommunicator,
                          another_auth_com: WebsocketCommunicator, assert_successed_response):
    await auth_com.send_json_to(filled_data["request"])

    response = await auth_com.receive_json_from()
    assert_successed_response(response)

    another_response = await another_auth_com.receive_json_from()
    assert_successed_response(another_response)


async def test_message_does_not_exist(filled_data: dict, auth_com: WebsocketCommunicator, another_auth_com: WebsocketCommunicator):
    filled_data["request"]["data"]["id"] = 404

    await auth_com.send_json_to(filled_data["request"])

    response = await auth_com.receive_json_from()
    assert filled_data["message_does_not_exist_response"] == response, response["data"]

    with pytest.raises(concurrent.futures._base.TimeoutError):
        await another_auth_com.receive_json_from()


async def test_message_is_foreign(filled_data: dict, auth_com: WebsocketCommunicator,
                                  another_auth_com: WebsocketCommunicator, dialog_message: DialogMessage):
    await another_auth_com.send_json_to(filled_data["request"])

    another_response = await another_auth_com.receive_json_from()
    assert filled_data["message_is_foreign_response"] == another_response, another_response["data"]

    with pytest.raises(concurrent.futures._base.TimeoutError):
        await auth_com.receive_json_from()
