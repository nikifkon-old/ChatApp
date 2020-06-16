from copy import deepcopy

import pytest
from channels.testing import WebsocketCommunicator
from django.contrib.auth import get_user_model

from backend.dialogs.models import Dialog, DialogMessage, DialogMessageInfo
from backend.socket_chat.tests.utils import round_to_minutes


User = get_user_model()
pytestmark = [pytest.mark.asyncio, pytest.mark.django_db(transaction=True)]


def star_message_by_id_for_user(message_id: int, user: User) -> None:
    info = DialogMessageInfo.objects.get(
        person=user,
        message__id=message_id
    )
    info.stared = True
    info.save()


def set_as_read_message_by_id_for_user(message_id: int, user: User) -> None:
    info = DialogMessageInfo.objects.get(
        person=user,
        message__id=message_id
    )
    info.unread = False
    info.save()


@pytest.fixture()
def dialog_messages(dialog_message_data: dict) -> list:
    return [dialog_message_data]


@pytest.fixture
def request_data(dialog: Dialog) -> dict:
    return {
        "id": dialog.id
    }


@pytest.fixture
def successed_response_data_for_user(dialog_data_for_user: dict) -> dict:
    return dialog_data_for_user


@pytest.fixture
def successed_response_data_for_another_user(dialog_data_for_another_user: dict) -> dict:
    return dialog_data_for_another_user


@pytest.fixture
def filled_data(yml_dataset: dict, request_data: dict,
                successed_response_data_for_user: dict, successed_response_data_for_another_user: dict):
    data = yml_dataset["test_get_dialog_event"]
    data["request"]["data"] = request_data
    data["successed_response_for_user"] = deepcopy(data["successed_response"])
    data["successed_response_for_user"]["data"] = successed_response_data_for_user
    data["successed_response_data_for_another_user"] = deepcopy(data["successed_response"])
    data["successed_response_data_for_another_user"]["data"] = successed_response_data_for_another_user

    data["successed_response_with_no_messages_for_user"] = deepcopy(data["successed_response_for_user"])
    data["successed_response_with_no_messages_for_user"]["data"]["messages"] = []

    data["successed_response_with_no_messages_for_another_user"] = deepcopy(data["successed_response_data_for_another_user"])
    data["successed_response_with_no_messages_for_another_user"]["data"]["messages"] = []

    data["successed_response_with_no_message_but_one_unread_for_user"] = deepcopy(data["successed_response_for_user"])
    data["successed_response_with_no_message_but_one_unread_for_user"]["data"]["messages"] = []
    data["successed_response_with_no_message_but_one_unread_for_user"]["data"]["unread_count"] = 1

    data["successed_response_with_no_message_but_one_unread_for_another_user"] = deepcopy(data["successed_response_data_for_another_user"])
    data["successed_response_with_no_message_but_one_unread_for_another_user"]["data"]["messages"] = []
    data["successed_response_with_no_message_but_one_unread_for_another_user"]["data"]["unread_count"] = 1

    data["successed_response_with_stared_message_for_user"] = deepcopy(data["successed_response_for_user"])
    data["successed_response_with_stared_message_for_user"]["data"]["messages"][0]["stared"] = True

    data["successed_response_with_unread_message_for_user"] = deepcopy(data["successed_response_for_user"])
    data["successed_response_with_unread_message_for_user"]["data"]["messages"][0]["unread"] = True
    data["successed_response_with_unread_message_for_user"]["data"]["unread_count"] = 1

    data["successed_response_with_unread_message_for_another_user"] = deepcopy(data["successed_response_data_for_another_user"])
    data["successed_response_with_unread_message_for_another_user"]["data"]["messages"][0]["unread"] = True
    data["successed_response_with_unread_message_for_another_user"]["data"]["unread_count"] = 1

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
    assert_custom_response(response, filled_data["successed_response_for_user"])


async def test_stared_filtering(filled_data: dict, auth_com: WebsocketCommunicator,
                                dialog_message: DialogMessage, user: User,
                                another_auth_com: WebsocketCommunicator, assert_custom_response):
    # 1. user send message
    # 2. user get dialog with messages with stared filter and assert that no messages
    request_with_stared_filter = filled_data["request"]
    request_with_stared_filter["data"]["filter"] = "stared"
    await auth_com.send_json_to(request_with_stared_filter)
    response = await auth_com.receive_json_from()
    assert_custom_response(response, filled_data["successed_response_with_no_messages_for_user"])
    # 3. user star messsage
    star_message_by_id_for_user(dialog_message.id, user)
    # 4. user get dialog with messages with stared filter, and assert that one message
    await auth_com.send_json_to(request_with_stared_filter)
    second_response = await auth_com.receive_json_from()
    assert_custom_response(second_response, filled_data["successed_response_with_stared_message_for_user"])
    # 5. another_user get dialog with messages with stared filter, and assert there are no messages
    await another_auth_com.send_json_to(request_with_stared_filter)
    another_response = await another_auth_com.receive_json_from()
    assert_custom_response(another_response, filled_data["successed_response_with_no_message_but_one_unread_for_another_user"])


async def test_unread_filtering(filled_data: dict, auth_com: WebsocketCommunicator,
                                dialog_message: DialogMessage, another_user: User,
                                another_auth_com: WebsocketCommunicator, assert_custom_response):
    # 1. user send message
    # 2. another_user get dialog with messages with unread filter and assert there is one message
    request_with_unread_filter = filled_data["request"]
    request_with_unread_filter["data"]["filter"] = "unread"
    await another_auth_com.send_json_to(request_with_unread_filter)
    response = await another_auth_com.receive_json_from()
    assert_custom_response(response, filled_data["successed_response_with_unread_message_for_another_user"])
    # 3. another_user read message
    set_as_read_message_by_id_for_user(dialog_message.id, another_user)
    # 4. another_user get dialog with messages with unread filter and assert there are no messages
    await another_auth_com.send_json_to(request_with_unread_filter)
    another_response = await another_auth_com.receive_json_from()
    assert_custom_response(another_response, filled_data["successed_response_with_no_messages_for_another_user"])
