import pytest

from backend.dialogs.models import DialogMembership

pytestmark = [pytest.mark.django_db]


def test_dialog_add_member(dialog, user, another_user):
    DialogMembership.objects.create(person=user, dialog=dialog)
    DialogMembership.objects.create(person=another_user, dialog=dialog)
    assert dialog.members.count() == 2
    assert user in dialog.members.all()
    assert another_user in dialog.members.all()
