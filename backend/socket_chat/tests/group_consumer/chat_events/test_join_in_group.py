from datetime import datetime

import pytest
from channels.testing import WebsocketCommunicator

from backend.groups.models import ChatGroup


pytestmark = [pytest.mark.asyncio, pytest.mark.django_db(transaction=True)]


@pytest.fixture
def filled_data(yml_dataset: dict, group_with_one_member: ChatGroup, another_user_serialized_data: dict, user_serialized_data: dict):
    data = yml_dataset["test_join_in_group_event"]
    data["request_data"]["data"]["id"] = group_with_one_member.id
    data["request_data"]["data"]["slug"] = group_with_one_member.slug
    data["successed_response"]["data"]["id"] = group_with_one_member.id
    data["successed_response"]["data"]["members"][0]["person"] = user_serialized_data
    data["successed_response"]["data"]["members"][1]["person"] = another_user_serialized_data
    data["successed_response"]["data"]["members"][0]["date_joined"] = str(datetime.date(datetime.today()))
    data["successed_response"]["data"]["members"][1]["date_joined"] = str(datetime.date(datetime.today()))
    return data


async def test_successed_with_id(filled_data: dict, another_auth_com: WebsocketCommunicator):
    filled_data["request_data"]["data"].pop("slug")
    await another_auth_com.send_json_to(filled_data["request_data"])
    response = await another_auth_com.receive_json_from()
    assert filled_data["successed_response"] == response, response["data"]


async def test_successed_with_slug(filled_data: dict, another_auth_com: WebsocketCommunicator):
    filled_data["request_data"]["data"].pop("id")
    await another_auth_com.send_json_to(filled_data["request_data"])
    response = await another_auth_com.receive_json_from()
    assert filled_data["successed_response"] == response, response["data"]


async def test_group_does_not_exist_with_id(filled_data: dict, another_auth_com: WebsocketCommunicator):
    filled_data["request_data"]["data"].pop("slug")
    filled_data["request_data"]["data"]["id"] = 404
    await another_auth_com.send_json_to(filled_data["request_data"])
    response = await another_auth_com.receive_json_from()
    assert filled_data["group_does_not_exist_response"] == response, response["data"]


async def test_group_does_not_exist_with_slug(filled_data: dict, another_auth_com: WebsocketCommunicator):
    filled_data["request_data"]["data"].pop("id")
    filled_data["request_data"]["data"]["slug"] = "doesnotexist"
    await another_auth_com.send_json_to(filled_data["request_data"])
    response = await another_auth_com.receive_json_from()
    assert filled_data["group_does_not_exist_response"] == response, response["data"]
