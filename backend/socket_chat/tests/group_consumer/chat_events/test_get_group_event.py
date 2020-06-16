from copy import deepcopy

import pytest
from channels.testing import WebsocketCommunicator
from django.contrib.auth import get_user_model

from backend.groups.models import ChatGroup, GroupMessage, GroupMessageInfo
from backend.socket_chat.tests.utils import round_to_minutes


User = get_user_model()
pytestmark = [pytest.mark.asyncio, pytest.mark.django_db(transaction=True)]


def star_message_by_id_for_user(message_id: int, user: User) -> None:
    info = GroupMessageInfo.objects.get(
        person=user,
        message__id=message_id
    )
    info.stared = True
    info.save()


def set_as_read_message_by_id_for_user(message_id: int, user: User) -> None:
    info = GroupMessageInfo.objects.get(
        person=user,
        message__id=message_id
    )
    info.unread = False
    info.save()


@pytest.fixture()
def group_messages(group_message_data: dict) -> list:
    return [group_message_data]


@pytest.fixture
def request_data(group: ChatGroup) -> dict:
    return {
        "id": group.id,
    }


@pytest.fixture
def successed_response_data(group_data: dict) -> dict:
    return group_data


@pytest.fixture
def filled_data(yml_dataset: dict, request_data: dict, successed_response_data: dict) -> dict:
    data = yml_dataset["test_get_group_event"]
    data["request"]["data"] = request_data
    data["successed_response"]["data"] = successed_response_data

    data["successed_response_with_no_messages"] = deepcopy(data["successed_response"])
    data["successed_response_with_no_messages"]["data"]["messages"] = []

    data["successed_response_with_no_message_but_one_unread"] = deepcopy(data["successed_response"])
    data["successed_response_with_no_message_but_one_unread"]["data"]["messages"] = []
    data["successed_response_with_no_message_but_one_unread"]["data"]["unread_count"] = 1

    data["successed_response_with_stared_message"] = deepcopy(data["successed_response"])
    data["successed_response_with_stared_message"]["data"]["messages"][0]["stared"] = True

    data["successed_response_with_unread_message"] = deepcopy(data["successed_response"])
    data["successed_response_with_unread_message"]["data"]["messages"][0]["unread"] = True
    data["successed_response_with_unread_message"]["data"]["unread_count"] = 1
    return data


@pytest.fixture
def assert_custom_response(ok_status: str):
    def do_assert(response, expected_response) -> int:
        assert response["status"] == ok_status, response["data"]
        for message in response["data"]["messages"]:
            message["date"] = round_to_minutes(message["date"])
        response["data"]["last_message"]["date"] = round_to_minutes(response["data"]["last_message"]["date"])
        assert expected_response == response, response["data"]
    return do_assert


async def test_successed(filled_data: dict, auth_com: WebsocketCommunicator, assert_custom_response):
    await auth_com.send_json_to(filled_data["request"])
    response = await auth_com.receive_json_from()
    assert_custom_response(response, filled_data["successed_response"])


async def test_stared_filtering(filled_data: dict, auth_com: WebsocketCommunicator,
                                group_message: GroupMessage, user: User,
                                another_auth_com: WebsocketCommunicator, assert_custom_response):
    # 1. user send message
    # 2. user get group with messages with stared filter and assert that no messages
    request_with_stared_filter = filled_data["request"]
    request_with_stared_filter["data"]["filter"] = "stared"
    await auth_com.send_json_to(request_with_stared_filter)
    response = await auth_com.receive_json_from()
    assert_custom_response(response, filled_data["successed_response_with_no_messages"])
    # 3. user star messsage
    star_message_by_id_for_user(group_message.id, user)
    # 4. user get group with messages with stared filter, and assert that one message
    await auth_com.send_json_to(request_with_stared_filter)
    second_response = await auth_com.receive_json_from()
    assert_custom_response(second_response, filled_data["successed_response_with_stared_message"])
    # 5. another_user get group with messages with stared filter, and assert there are no messages
    await another_auth_com.send_json_to(request_with_stared_filter)
    another_response = await another_auth_com.receive_json_from()
    assert_custom_response(another_response, filled_data["successed_response_with_no_message_but_one_unread"])


async def test_unread_filtering(filled_data: dict, auth_com: WebsocketCommunicator,
                                group_message: GroupMessage, another_user: User,
                                another_auth_com: WebsocketCommunicator, assert_custom_response):
    # 1. user send message
    # 2. another_user get  with messages with unread filter and assert there is one message
    request_with_unread_filter = filled_data["request"]
    request_with_unread_filter["data"]["filter"] = "unread"
    await another_auth_com.send_json_to(request_with_unread_filter)
    response = await another_auth_com.receive_json_from()
    assert_custom_response(response, filled_data["successed_response_with_unread_message"])
    # 3. another_user read message
    set_as_read_message_by_id_for_user(group_message.id, another_user)
    # 4. another_user get dialog with messages with unread filter and assert there are no messages
    await another_auth_com.send_json_to(request_with_unread_filter)
    another_response = await another_auth_com.receive_json_from()
    assert_custom_response(another_response, filled_data["successed_response_with_no_messages"])
