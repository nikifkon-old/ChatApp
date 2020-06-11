import pytest
from channels.testing import WebsocketCommunicator
from django.contrib.auth import get_user_model


User = get_user_model()
pytestmark = [pytest.mark.asyncio, pytest.mark.django_db(transaction=True)]


@pytest.fixture
def request_data(another_user: User) -> dict:
    return {
        "id": another_user.id
    }


@pytest.fixture
def successed_response_data() -> dict:
    return {
        "messages": [],
        "interlocutor": {},
        "unread_count": 0,
        "last_message": {
            "sender": None,
            "text": ""
        }
    }


@pytest.fixture
def filled_data(yml_dataset: dict, request_data: dict, successed_response_data: dict) -> dict:
    data = yml_dataset["test_create_dialog_event"]
    data["request"]["data"] = request_data
    data["successed_response"]["data"] = successed_response_data
    return data


@pytest.fixture
def assert_successed_response_for_user(ok_status: str, filled_data: dict, request_data: dict,
                                       user_serialized_data: dict, another_user_serialized_data: dict):
    def do_assert(response, user) -> int:
        assert response["status"] == ok_status, response["data"]
        dialog_id = response["data"].pop("id")

        if user.id != request_data["id"]:
            filled_data["successed_response"]["data"]["interlocutor"] = another_user_serialized_data
        else:
            filled_data["successed_response"]["data"]["interlocutor"] = user_serialized_data
        assert filled_data["successed_response"] == response, response["data"]
        return dialog_id
    return do_assert


async def test_successed(filled_data: dict, auth_com: WebsocketCommunicator,
                         another_auth_com: WebsocketCommunicator, ok_status: str,
                         assert_successed_response_for_user, user: User, another_user: User):
    await auth_com.send_json_to(filled_data["request"])

    response = await auth_com.receive_json_from()
    dialog_id = assert_successed_response_for_user(response, user)

    another_response = await another_auth_com.receive_json_from()
    another_dialog_id = assert_successed_response_for_user(another_response, another_user)

    assert dialog_id == another_dialog_id, "Dialog ids must be equal"


async def test_with_does_not_exist_user(filled_data: dict, auth_com: WebsocketCommunicator):
    filled_data["request"]["data"]["id"] = 404

    await auth_com.send_json_to(filled_data["request"])
    response = await auth_com.receive_json_from()

    assert filled_data["user_does_not_exist_response"] == response, response["data"]


async def test_with_user_with_whom_you_already_have_dialog(filled_data: dict, auth_com: WebsocketCommunicator,
                                                           another_user: User):
    await auth_com.send_json_to(filled_data["request"])
    await auth_com.receive_json_from()

    await auth_com.send_json_to(filled_data["request"])
    response = await auth_com.receive_json_from()

    assert filled_data["dialog_already_exist_response"] == response, response["data"]
