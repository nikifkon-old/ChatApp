import pytest
from channels.testing import WebsocketCommunicator

from backend.groups.models import ChatGroup


pytestmark = [pytest.mark.asyncio, pytest.mark.django_db(transaction=True)]


@pytest.fixture
def request_data(group_with_one_member: ChatGroup) -> dict:
    return {
        "id": group_with_one_member.id,
        "slug": group_with_one_member.slug
    }


@pytest.fixture
def successed_response_data(group_with_one_member_data: dict, group_members: list) -> dict:
    group_with_one_member_data["members"] = group_members
    return group_with_one_member_data


@pytest.fixture
def filled_data(yml_dataset: dict, request_data: dict, successed_response_data: dict):
    data = yml_dataset["test_join_in_group_event"]
    data["request"]["data"] = request_data
    data["successed_response"]["data"] = successed_response_data
    return data


async def test_successed_with_id(filled_data: dict, another_auth_com: WebsocketCommunicator):
    filled_data["request"]["data"].pop("slug")
    await another_auth_com.send_json_to(filled_data["request"])
    response = await another_auth_com.receive_json_from()
    assert filled_data["successed_response"] == response, response["data"]


async def test_successed_with_slug(filled_data: dict, another_auth_com: WebsocketCommunicator):
    filled_data["request"]["data"].pop("id")
    await another_auth_com.send_json_to(filled_data["request"])
    response = await another_auth_com.receive_json_from()
    assert filled_data["successed_response"] == response, response["data"]


async def test_group_does_not_exist_with_id(filled_data: dict, another_auth_com: WebsocketCommunicator):
    filled_data["request"]["data"].pop("slug")
    filled_data["request"]["data"]["id"] = 404
    await another_auth_com.send_json_to(filled_data["request"])
    response = await another_auth_com.receive_json_from()
    assert filled_data["group_does_not_exist_response"] == response, response["data"]


async def test_group_does_not_exist_with_slug(filled_data: dict, another_auth_com: WebsocketCommunicator):
    filled_data["request"]["data"].pop("id")
    filled_data["request"]["data"]["slug"] = "doesnotexist"
    await another_auth_com.send_json_to(filled_data["request"])
    response = await another_auth_com.receive_json_from()
    assert filled_data["group_does_not_exist_response"] == response, response["data"]
