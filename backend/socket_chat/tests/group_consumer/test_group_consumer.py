import pytest
from datetime import datetime
from channels.testing import WebsocketCommunicator


pytestmark = [pytest.mark.asyncio]


@pytest.mark.django_db(transaction=True)
async def test_successed(yml_dataset: dict, auth_com: WebsocketCommunicator, user_serialized_data: dict):
    test_data = yml_dataset["test_create_group_event"]
    test_data["expected_response"]["data"]["members"][0] = user_serialized_data
    test_data["expected_response"]['data']["members"][0]["date_joined"] = str(datetime.date(datetime.today()))
    test_data["expected_response"]['data']["members"][0]["role"] = "A"

    await auth_com.send_json_to(test_data["request_data"])
    response = await auth_com.receive_json_from()
    assert test_data["expected_response"] == response, response
