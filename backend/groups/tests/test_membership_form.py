import pytest

from backend.groups.forms import GroupMembershipForm


pytestmark = [pytest.mark.django_db]


def test_successed(group, another_user):
    data = {
        "group": group.id,
        "person": another_user.id,
        "role": "S"
    }
    form = GroupMembershipForm(data)
    assert form.is_valid(), form.errors
    form.save()


def test_alreay_in_group(group, user):
    data = {
        "group": group.id,
        "person": user.id,
        "role": "S"
    }
    form = GroupMembershipForm(data)
    assert not form.is_valid(), form.cleaned_data
    assert ["Membership in group with this Person and Group already exists."] == form.errors["__all__"], form.errors
