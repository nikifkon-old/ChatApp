import pytest
from django.contrib.auth import get_user_model

from channels.testing import WebsocketCommunicator
from backend.dialogs.forms import DialogMessageForm
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
async def dialog_message(dialog: Dialog, user: User, message_text: str) -> DialogMessage:
    data = {
        "sender": user.id,
        "dialog": dialog.id,
        "text": message_text,
    }
    form = DialogMessageForm(data)
    assert form.is_valid(), form.errors
    return form.save()


@pytest.fixture
async def dialog_message_sender(user):
    return {
        "id": user.id,
        "username": user.username,
        "avatar": user.avatar.url
    }
