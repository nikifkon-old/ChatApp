import pytest
from channels.testing import WebsocketCommunicator

from backend.groups.models import GroupMessage


pytestmark = [pytest.mark.asyncio, pytest.mark.django_db(transaction=True)]


@pytest.fixture
def request_data(group_message: GroupMessage, message_text: str) -> dict:
    return {
        "id": group_message.id,
        "stared": True
    }


@pytest.fixture
def successed_response_data(group_message: GroupMessage) -> dict:
    return {
        "id": group_message.id,
        "stared": True
    }


@pytest.fixture
def filled_data(yml_dataset: dict, request_data: dict, successed_response_data: dict) -> dict:
    data = yml_dataset["test_star_message_in_group_event"]
    data["request"]["data"] = request_data
    data["successed_response"]["data"] = successed_response_data
    return data


async def test_successed(filled_data: dict, auth_com: WebsocketCommunicator):
    await auth_com.send_json_to(filled_data["request"])
    response = await auth_com.receive_json_from()

    assert filled_data["successed_response"] == response, response["data"]
