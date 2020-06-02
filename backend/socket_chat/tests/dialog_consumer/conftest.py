from datetime import datetime

import pytest
from channels.testing import WebsocketCommunicator
from django.contrib.auth import get_user_model

from backend.dialogs.models import Dialog, DialogMessage


User = get_user_model()


@pytest.fixture
def message_text() -> str:
    return "some_text"


@pytest.fixture
async def dialog(get_yml_dataset, auth_com: WebsocketCommunicator,
                 another_auth_com: WebsocketCommunicator, another_user: User,
                 user: User, ok_status: str) -> Dialog:
    test_data = get_yml_dataset(__file__)["test_create_dialog_event"]
    test_data["request_data"]["data"]["id"] = another_user.id

    await auth_com.send_json_to(test_data["request_data"])

    response = await auth_com.receive_json_from()
    assert response["status"] == ok_status

    another_response = await another_auth_com.receive_json_from()
    assert another_response["status"] == ok_status

    return Dialog.objects.get(id=response["data"]["id"])


@pytest.fixture
async def dialog_message(auth_com: WebsocketCommunicator, dialog: Dialog,
                         user: User, message_text: str) -> DialogMessage:
    data = {
        "sender_id": user.id,
        "dialog_id": dialog.id,
        "text": message_text,
        "date": datetime.date(datetime.today())
    }
    return DialogMessage.objects.create(**data)
