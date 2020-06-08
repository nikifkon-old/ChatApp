import pytest
from channels.testing import WebsocketCommunicator
from django.contrib.auth import get_user_model


User = get_user_model()
pytestmark = [pytest.mark.asyncio, pytest.mark.django_db(transaction=True)]


@pytest.fixture
def filled_data(yml_dataset: dict, another_user: User, user_serialized_data: dict, another_user_serialized_data: dict) -> dict:
    data = yml_dataset["test_create_dialog_event"]
    data["request_data"]["data"]["id"] = another_user.id

    data["successed_response_for_user"]["data"]["interlocutor"] = another_user_serialized_data
    data["successed_response_for_another_user"]["data"]["interlocutor"] = user_serialized_data
    return data


async def test_successed(filled_data: dict, auth_com: WebsocketCommunicator,
                         another_auth_com: WebsocketCommunicator, ok_status: str):
    await auth_com.send_json_to(filled_data["request_data"])

    response = await auth_com.receive_json_from()
    assert response["status"] == ok_status, response["data"]
    dialog_id_from_first = response["data"].pop("id")
    assert filled_data["successed_response_for_user"] == response, response["data"]

    another_response = await another_auth_com.receive_json_from()
    assert response["status"] == ok_status, response["data"]
    dialog_id_from_second = another_response["data"].pop("id")
    assert filled_data["successed_response_for_another_user"] == another_response, another_response["data"]

    assert dialog_id_from_first == dialog_id_from_second, "Dialog ids must be equal"


async def test_with_does_not_exist_user(filled_data: dict, auth_com: WebsocketCommunicator):
    filled_data["request_data"]["data"]["id"] = 404

    await auth_com.send_json_to(filled_data["request_data"])
    response = await auth_com.receive_json_from()

    assert filled_data["user_does_not_exist_response"] == response, response["data"]


async def test_with_user_with_whom_you_already_have_dialog(filled_data: dict, auth_com: WebsocketCommunicator, another_user: User):
    await auth_com.send_json_to(filled_data["request_data"])
    await auth_com.receive_json_from()

    await auth_com.send_json_to(filled_data["request_data"])
    response = await auth_com.receive_json_from()

    assert filled_data["dialog_already_exist_response"] == response, response["data"]
