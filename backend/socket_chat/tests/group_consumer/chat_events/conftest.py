from datetime import datetime

import pytest
from channels.testing import WebsocketCommunicator

from backend.groups.models import ChatGroup


@pytest.fixture
def one_group_member(user_serialized_data: dict) -> list:
    return [
        {
            "person": user_serialized_data,
            "date_joined": str(datetime.date(datetime.today())),
            "role": "A"
        }
    ]


@pytest.fixture
def request_data() -> dict:
    return {
        "name": "test_group",
        "slug": "test_group_slug",
        "description": "test_group_description"
    }


@pytest.fixture
async def group_with_one_member(yml_dataset: dict, request_data: dict, auth_com: WebsocketCommunicator) -> ChatGroup:
    test_data = yml_dataset["test_create_group_event"]
    test_data["request"]["data"] = request_data

    await auth_com.send_json_to(test_data["request"])
    response = await auth_com.receive_json_from()
    assert response["status"] == "ok", response["data"]

    return ChatGroup.objects.get(id=response["data"]["id"])


@pytest.fixture
def group_with_one_member_data(group_with_one_member: ChatGroup, one_group_member: list) -> dict:
    return {
        "id": group_with_one_member.id,
        "name": group_with_one_member.name,
        "slug": group_with_one_member.slug,
        "img": None,
        "description": group_with_one_member.description,
        "messages": [],
        "members": one_group_member,
        "unread_count": 0,
        "last_message": {
            "sender": None,
            "text": ""
        }
    }
