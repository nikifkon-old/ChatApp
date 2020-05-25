import pytest

from backend.dialogs.models import DialogMembership

pytestmark = [pytest.mark.django_db]


def test_dialog_add_member(dialog, user, another_user):
    member_for_user = DialogMembership.objects.create(person=user, dialog=dialog)
    member_for_another_user = DialogMembership.objects.create(person=another_user, dialog=dialog)
    assert dialog.members.count() == 2
