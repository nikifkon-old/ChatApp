from datetime import datetime

import pytest

from backend.groups.forms import GroupForm
from backend.groups.models import GroupMembership


pytestmark = [pytest.mark.django_db]


def test_successed(group_data):
    form = GroupForm(group_data)
    assert form.is_valid(), form.errors
    group = form.save()
    creator = group.members.first()
    creator_membership = GroupMembership.objects.get(group=group, person=creator)
    assert creator_membership.role == "A", "Creator must have Admin role"
    assert creator_membership.date_joined == datetime.date(datetime.today())


def test_this_slug_already_taken(group, group_data):
    form = GroupForm(group_data)
    assert not form.is_valid(), form.cleaned_data
    assert ["This Slug `%s` has already taken" % group_data["slug"]] == form.errors["__all__"], form.errors
