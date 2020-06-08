from datetime import datetime

import pytest
from channels.testing import WebsocketCommunicator
from django.contrib.auth import get_user_model


User = get_user_model()
pytestmark = [pytest.mark.asyncio, pytest.mark.django_db(transaction=True)]


@pytest.fixture
def filled_data(yml_dataset: dict, user_serialized_data: dict) -> dict:
    data = yml_dataset["test_create_group_event"]
    data["expected_response"]["data"]["members"][0]["person"] = user_serialized_data
    data["expected_response"]['data']["members"][0]["date_joined"] = str(datetime.date(datetime.today()))
    data["expected_response"]['data']["members"][0]["role"] = "A"

    data["group_with_given_slug_already_exist_response"]["data"]["detail"] = data["group_with_given_slug_already_exist_response"]["data"]["detail"].format(given_slug=data["request_data"]["data"]["slug"])
    return data


async def test_successed(filled_data: dict, auth_com: WebsocketCommunicator, user_serialized_data: dict):
    await auth_com.send_json_to(filled_data["request_data"])
    response = await auth_com.receive_json_from()
    response["data"].pop("id")
    assert filled_data["expected_response"] == response, response


async def test_already_slug_exist(filled_data: dict, group, auth_com: WebsocketCommunicator, user_serialized_data: dict):
    await auth_com.send_json_to(filled_data["request_data"])
    response = await auth_com.receive_json_from()
    assert filled_data["group_with_given_slug_already_exist_response"] == response, response
