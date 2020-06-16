from datetime import datetime

import pytest
from django.contrib.auth import get_user_model

from channels.testing import WebsocketCommunicator
from backend.dialogs.models import Dialog, DialogMessage


User = get_user_model()


@pytest.fixture
def dialog_create_request(get_yml_dataset, another_user) -> dict:
    root_dataset = get_yml_dataset(__file__)
    request_data = root_dataset["create_dialog_request"]
    request_data["data"]["id"] = another_user.id
    return request_data


@pytest.fixture
async def dialog(auth_com: WebsocketCommunicator, ok_status: str,
                 another_auth_com: WebsocketCommunicator, dialog_create_request: dict) -> Dialog:
    await auth_com.send_json_to(dialog_create_request)

    response = await auth_com.receive_json_from()
    assert response["status"] == ok_status, response["data"]

    another_response = await another_auth_com.receive_json_from()
    assert another_response["status"] == ok_status, another_response["data"]

    return Dialog.objects.get(id=response["data"]["id"])


@pytest.fixture
def dialog_unread_count() -> int:
    return 0


@pytest.fixture
def dialog_messages() -> list:
    return []


@pytest.fixture
def dialog_last_message(dialog_messages: list) -> dict:
    if len(dialog_messages) > 0:
        message = dialog_messages[-1]
        return {
            "sender": message["sender"]["id"],
            "text": message["text"],
            "date": message["date"]
        }
    else:
        return {
            "sender": None,
            "text": ""
        }


@pytest.fixture
def dialog_data_for_user(dialog: Dialog, dialog_messages: list, another_user_serialized_data: dict,
                         dialog_last_message: dict, dialog_unread_count: int) -> dict:
    return {
        "id": dialog.id,
        "messages": dialog_messages,
        "interlocutor": another_user_serialized_data,
        "unread_count": dialog_unread_count,
        "last_message": dialog_last_message,
    }


@pytest.fixture
def dialog_data_for_another_user(dialog: Dialog, dialog_messages: list, user_serialized_data: dict,
                                 dialog_last_message: dict, dialog_unread_count: int) -> dict:
    return {
        "id": dialog.id,
        "messages": dialog_messages,
        "interlocutor": user_serialized_data,
        "unread_count": dialog_unread_count,
        "last_message": dialog_last_message,
    }


@pytest.fixture
def message_text(get_yml_dataset) -> str:
    root_dataset = get_yml_dataset(__file__)
    return root_dataset["dialog_message_data"]["text"]


@pytest.fixture
def dialog_message_send_request(get_yml_dataset, dialog: Dialog, message_text: str) -> dict:
    root_dataset = get_yml_dataset(__file__)
    request = root_dataset["send_message_request"]
    request["data"]["id"] = dialog.id
    request["data"]["text"] = message_text
    return request


@pytest.fixture
async def dialog_message(auth_com: WebsocketCommunicator, ok_status: str,
                         another_auth_com: WebsocketCommunicator, dialog_message_send_request: dict) -> DialogMessage:
    await auth_com.send_json_to(dialog_message_send_request)

    response = await auth_com.receive_json_from()
    assert response["status"] == ok_status

    another_response = await another_auth_com.receive_json_from()
    assert another_response["status"] == ok_status

    return DialogMessage.objects.get(id=response["data"]["id"])


@pytest.fixture
async def dialog_message_sender(user):
    return {
        "id": user.id,
        "username": user.username,
        "avatar": user.avatar.url
    }


@pytest.fixture
def message_unread():
    return False


@pytest.fixture
def message_stared():
    return False


@pytest.fixture
def dialog_message_data(dialog_message: DialogMessage, dialog_message_sender: dict,
                        message_text: str, message_unread: bool, message_stared: bool,
                        dialog: Dialog) -> dict:
    return {
        "id": dialog_message.id,
        "sender": dialog_message_sender,
        "chat_id": dialog.id,
        "text": message_text,
        "unread": message_unread,
        "stared": message_stared,
        "date": datetime.utcnow().strftime("%Y-%m-%dT%H:%MZ")
    }
