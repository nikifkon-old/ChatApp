import pytest
from channels.testing import WebsocketCommunicator
from django.contrib.auth import get_user_model


User = get_user_model()
pytestmark = [pytest.mark.asyncio, pytest.mark.django_db(transaction=True)]


@pytest.fixture
def request_data() -> dict:
    return {
        "name": "test_group",
        "slug": "test_group_slug",
        "description": "test_group_description"
    }


@pytest.fixture
def successed_response_data(one_group_member: list) -> dict:
    return {
        "name": "test_group",
        "slug": "test_group_slug",
        "img": None,
        "description": "test_group_description",
        "messages": [],
        "members": one_group_member,
        "unread_count": 0,
        "last_message": {
            "sender": None,
            "text": ""
        }
    }


@pytest.fixture
def filled_data(yml_dataset: dict, request_data: dict, successed_response_data: dict) -> dict:
    data = yml_dataset["test_create_group_event"]
    data["request"]["data"] = request_data
    data["successed_response"]["data"] = successed_response_data

    slug = request_data["slug"]
    detail = data["group_with_given_slug_already_exist_response"]["data"]["detail"]
    data["group_with_given_slug_already_exist_response"]["data"]["detail"] = detail.format(given_slug=slug)
    return data


async def test_successed(filled_data: dict, auth_com: WebsocketCommunicator):
    await auth_com.send_json_to(filled_data["request"])
    response = await auth_com.receive_json_from()
    assert response["status"] == "ok", response["data"]
    response["data"].pop("id")
    assert filled_data["successed_response"] == response, response


async def test_already_slug_exist(filled_data: dict, group, auth_com: WebsocketCommunicator):
    await auth_com.send_json_to(filled_data["request"])
    response = await auth_com.receive_json_from()
    assert filled_data["group_with_given_slug_already_exist_response"] == response, response
