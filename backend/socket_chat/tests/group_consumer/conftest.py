from datetime import datetime

import pytest
from django.contrib.auth import get_user_model
from channels.testing import WebsocketCommunicator

from backend.groups.models import ChatGroup, GroupMessage


User = get_user_model()


@pytest.fixture
def group_create_request(get_yml_dataset) -> dict:
    root_dataset = get_yml_dataset(__file__)
    request_data = root_dataset["group_create_request"]
    return request_data


@pytest.fixture
def group_join_request(get_yml_dataset) -> dict:
    root_dataset = get_yml_dataset(__file__)
    request_data = root_dataset["group_join_request"]
    return request_data


@pytest.fixture
async def group(group_create_request: dict, ok_status: str, group_join_request: dict,
                auth_com: WebsocketCommunicator, another_auth_com: WebsocketCommunicator) -> ChatGroup:
    await auth_com.send_json_to(group_create_request)
    response = await auth_com.receive_json_from()

    assert ok_status == response["status"], response["data"]
    group_id = response["data"]["id"]
    group_join_request["data"]["id"] = group_id

    await another_auth_com.send_json_to(group_join_request)
    another_response = await another_auth_com.receive_json_from()

    assert ok_status == another_response["status"], another_response["data"]

    return ChatGroup.objects.get(id=group_id)


@pytest.fixture
def group_messages() -> list:
    return []


@pytest.fixture
def group_members(user_serialized_data, another_user_serialized_data):
    return [
        {
            "person": user_serialized_data,
            "date_joined": str(datetime.date(datetime.today())),
            "role": "A"
        },
        {
            "person": another_user_serialized_data,
            "date_joined": str(datetime.date(datetime.today())),
            "role": "S"
        }
    ]


@pytest.fixture
def last_message(group_messages: list) -> dict:
    if len(group_messages) > 0:
        message = group_messages[-1]
        return {
            "sender": message["sender"]["id"],
            "text": message["text"],
            "date": message["date"]
        }
    else:
        return {
            "sender": None,
            "text": ""
        }


@pytest.fixture
def unread_count() -> int:
    return 0


@pytest.fixture
def group_img(group: ChatGroup) -> str:
    if group.img.name == "":
        return None
    return group.img.url


@pytest.fixture
def group_data(group: ChatGroup, group_img: str, group_messages: list,
               group_members: list, last_message: dict, unread_count: int) -> dict:
    return {
        "id": group.id,
        "name": group.name,
        "slug": group.slug,
        "img": group_img,
        "description": group.description,
        "messages": group_messages,
        "members": group_members,
        "unread_count": unread_count,
        "last_message": last_message
    }


@pytest.fixture
def message_text(get_yml_dataset) -> str:
    root_dataset = get_yml_dataset(__file__)
    return root_dataset["group_message_data"]["text"]


@pytest.fixture
def group_message_send_request(get_yml_dataset, group: ChatGroup, message_text: str) -> dict:
    root_dataset = get_yml_dataset(__file__)
    request_data = root_dataset["messsage_send_request"]
    request_data["data"]["id"] = group.id
    request_data["data"]["text"] = message_text
    return request_data


@pytest.fixture
def group_message_sender(user: User) -> dict:
    return {
        "id": user.id,
        "username": user.username,
        "avatar": user.avatar.url
    }


@pytest.fixture
async def group_message(auth_com: WebsocketCommunicator, another_auth_com: WebsocketCommunicator,
                        group_message_send_request: dict, ok_status: str) -> GroupMessage:
    await auth_com.send_json_to(group_message_send_request)

    response = await auth_com.receive_json_from()
    assert response["status"] == ok_status, response["data"]

    another_response = await another_auth_com.receive_json_from()
    assert another_response["status"] == ok_status, another_response["data"]

    return GroupMessage.objects.get(id=response["data"]["id"])


@pytest.fixture
def unread() -> bool:
    return False


@pytest.fixture
def stared() -> bool:
    return False


@pytest.fixture
def group_message_data(group_message: GroupMessage, group_message_sender: dict,
                       message_text: str, unread: bool, stared: bool,
                       group: ChatGroup) -> dict:
    return {
        "id": group_message.id,
        "sender": group_message_sender,
        "chat_id": group.id,
        "text": message_text,
        "unread": unread,
        "stared": stared,
        "date": datetime.utcnow().strftime("%Y-%m-%dT%H:%MZ")
    }
