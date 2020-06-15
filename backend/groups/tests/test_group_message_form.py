import pytest
from django.contrib.auth import get_user_model

from backend.groups.forms import GroupMessageForm
from backend.groups.models import ChatGroup, GroupMessage, GroupMessageInfo


User = get_user_model()
pytestmark = [pytest.mark.django_db]


@pytest.fixture
def message(group: ChatGroup, user: User):
    data = {
        "chat": group.id,
        "sender": user.id,
        "text": "test"
    }
    form = GroupMessageForm(data)
    assert form.is_valid(), form.errors
    return form.save()


def test_successed(group: ChatGroup, user: User):
    data = {
        "chat": group.id,
        "sender": user.id,
        "text": "test"
    }
    form = GroupMessageForm(data)
    assert form.is_valid(), form.errors
    form.save()


def test_message_info_created(group_with_two_members: ChatGroup, message: GroupMessage,
                              user: User, another_user: User):
    info = GroupMessageInfo.objects.get(message=message, person=user)
    another_info = GroupMessageInfo.objects.get(message=message, person=another_user)
    assert info.unread is False, info
    assert another_info.unread is True, another_info
