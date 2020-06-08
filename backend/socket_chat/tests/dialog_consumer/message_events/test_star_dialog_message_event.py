import pytest
from channels.testing import WebsocketCommunicator

from backend.dialogs.models import DialogMessage


pytestmark = [pytest.mark.asyncio, pytest.mark.django_db(transaction=True)]


@pytest.fixture
def filled_data(yml_dataset: dict, dialog_message: DialogMessage) -> dict:
    data = yml_dataset["test_star_message_in_dialog_event"]
    data["request_data"]["data"]["id"] = dialog_message.id
    data["successed_response"]["data"]["id"] = dialog_message.id
    return data


async def test_successed(filled_data: dict, auth_com: WebsocketCommunicator):
    await auth_com.send_json_to(filled_data["request_data"])
    response = await auth_com.receive_json_from(10)

    assert filled_data["successed_response"] == response, response["data"]
