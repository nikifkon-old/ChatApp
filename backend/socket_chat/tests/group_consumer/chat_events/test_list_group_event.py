from datetime import datetime

import pytest
from channels.testing import WebsocketCommunicator

from backend.groups.models import ChatGroup


pytestmark = [pytest.mark.asyncio, pytest.mark.django_db(transaction=True)]


@pytest.fixture
def filled_data(yml_dataset: dict, group: ChatGroup, user_serialized_data, another_user_serialized_data: dict):
    data = yml_dataset["test_list_group_event"]
    data["request_data"]["data"]["id"] = group.id
    data["successed_response"]["data"][0]["id"] = group.id
    data["successed_response"]["data"][0]["members"][0]["person"] = user_serialized_data
    data["successed_response"]["data"][0]["members"][1]["person"] = another_user_serialized_data
    data["successed_response"]["data"][0]["members"][0]["date_joined"] = str(datetime.date(datetime.today()))
    data["successed_response"]["data"][0]["members"][1]["date_joined"] = str(datetime.date(datetime.today()))
    return data


async def test_successed(filled_data: dict, auth_com: WebsocketCommunicator):
    await auth_com.send_json_to(filled_data["request_data"])
    response = await auth_com.receive_json_from()
    assert filled_data["successed_response"] == response, response["data"]
