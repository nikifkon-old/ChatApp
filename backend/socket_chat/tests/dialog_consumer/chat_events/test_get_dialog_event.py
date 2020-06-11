import pytest
from channels.testing import WebsocketCommunicator

from backend.dialogs.models import Dialog


pytestmark = [pytest.mark.asyncio, pytest.mark.django_db(transaction=True)]


@pytest.fixture
def request_data(dialog: Dialog) -> dict:
    return {
        "id": dialog.id
    }


@pytest.fixture
def successed_response_data(dialog_data_for_user: dict) -> dict:
    return dialog_data_for_user


@pytest.fixture
def filled_data(yml_dataset: dict, request_data: dict, successed_response_data: dict):
    data = yml_dataset["test_get_dialog_event"]
    data["request"]["data"] = request_data
    data["successed_response"]["data"] = successed_response_data
    return data


async def test_successed(filled_data: dict, auth_com: WebsocketCommunicator):
    await auth_com.send_json_to(filled_data["request"])
    response = await auth_com.receive_json_from()
    assert filled_data["successed_response"] == response, response["data"]
