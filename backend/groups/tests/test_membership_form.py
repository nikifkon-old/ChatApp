import pytest
from django.contrib.auth import get_user_model

from backend.groups.forms import GroupMembershipForm
from backend.groups.models import ChatGroup


User = get_user_model()
pytestmark = [pytest.mark.django_db]


def test_successed(group: ChatGroup, another_user: User):
    data = {
        "group": group.id,
        "person": another_user.id,
        "role": "S"
    }
    form = GroupMembershipForm(data)
    assert form.is_valid(), form.errors
    form.save()


def test_alreay_in_group(yml_dataset: dict, group: ChatGroup, user: User):
    data = {
        "group": group.id,
        "person": user.id,
        "role": "S"
    }
    form = GroupMembershipForm(data)
    assert not form.is_valid(), form.cleaned_data
    assert yml_dataset["test_membership_form"]["already_in_group_error_message"] == form.errors, form.errors
