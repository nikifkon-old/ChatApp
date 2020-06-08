import pytest
from django.contrib.auth import get_user_model

from backend.groups.forms import GroupMessageForm
from backend.groups.models import ChatGroup, GroupMessage


User = get_user_model()


@pytest.fixture
def message_text() -> str:
    return "some_text"


@pytest.fixture
async def group_with_one_member(get_yml_dataset, auth_com, user):
    request_data = get_yml_dataset(__file__)["test_create_group_event"]["request_data"]

    await auth_com.send_json_to(request_data)
    response = await auth_com.receive_json_from()
    assert response["status"] == "ok", response["data"]

    return ChatGroup.objects.get(id=response["data"]["id"])


@pytest.fixture
async def group(get_yml_dataset, group_with_one_member, another_auth_com):
    request_data = get_yml_dataset(__file__)["test_join_in_group_event"]["request_data"]
    request_data["data"]["id"] = group_with_one_member.id

    await another_auth_com.send_json_to(request_data)
    response = await another_auth_com.receive_json_from()
    assert response["status"] == "ok", response["data"]

    return ChatGroup.objects.get(id=response["data"]["id"])


@pytest.fixture
async def group_message(group: ChatGroup, user: User, message_text: str) -> GroupMessage:
    data = {
        "sender": user.id,
        "group": group.id,
        "text": message_text,
    }
    form = GroupMessageForm(data)
    assert form.is_valid(), form.errors
    return form.save()
