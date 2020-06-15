import pytest
from django.contrib.auth import get_user_model

from backend.groups.forms import GroupForm, GroupMembershipForm
from backend.groups.models import ChatGroup

User = get_user_model()


@pytest.fixture
def group_data(user: User, another_user: User) -> dict:
    return {
        "name": "Test Name",
        "slug": "test_slug",
        "img": "person/defaultAvatar.png",
        "description": "test description",
        "members": [user]
    }


@pytest.fixture
def group(group_data: dict) -> ChatGroup:
    return GroupForm(group_data).save()


@pytest.fixture
def group_with_two_members(group: ChatGroup, another_user: User) -> ChatGroup:
    data = {
        "group": group.id,
        "person": another_user.id,
        "role": "S"
    }
    form = GroupMembershipForm(data)
    form.save()
    return group
