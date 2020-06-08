import pytest
from channels.testing import WebsocketCommunicator

from backend.groups.models import GroupMessage


pytestmark = [pytest.mark.asyncio, pytest.mark.django_db(transaction=True)]


@pytest.fixture
def filled_data(yml_dataset: dict, group_message: GroupMessage) -> dict:
    data = yml_dataset["test_star_message_in_group_event"]
    data["request_data"]["data"]["id"] = group_message.id
    data["successed_response"]["data"]["id"] = group_message.id
    return data


async def test_successed(filled_data: dict, auth_com: WebsocketCommunicator):
    await auth_com.send_json_to(filled_data["request_data"])
    response = await auth_com.receive_json_from(10)

    assert filled_data["successed_response"] == response, response["data"]
