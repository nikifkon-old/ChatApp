import pytest
from channels.testing import WebsocketCommunicator

from backend.dialogs.models import Dialog


pytestmark = [pytest.mark.asyncio, pytest.mark.django_db(transaction=True)]


@pytest.fixture
def filled_data(yml_dataset: dict, dialog: Dialog, another_user_serialized_data: dict):
    data = yml_dataset["test_list_dialog_event"]
    data["request_data"]["data"]["id"] = dialog.id
    data["successed_response"]["data"][0]["id"] = dialog.id
    data["successed_response"]["data"][0]["interlocutor"] = another_user_serialized_data
    return data


async def test_successed(filled_data: dict, auth_com: WebsocketCommunicator):
    await auth_com.send_json_to(filled_data["request_data"])
    response = await auth_com.receive_json_from()
    assert filled_data["successed_response"] == response, response["data"]
