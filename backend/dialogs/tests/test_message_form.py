import pytest

from backend.dialogs.forms import DialogMessageForm
from backend.dialogs.models import DialogMessageInfo


pytestmark = [pytest.mark.django_db]


@pytest.fixture
def message(dialog, user):
    data = {
        "chat": dialog.id,
        "sender": user.id,
        "text": "test"
    }
    form = DialogMessageForm(data)
    assert form.is_valid(), form.errors
    return form.save()


def test_successed(dialog, user):
    data = {
        "chat": dialog.id,
        "sender": user.id,
        "text": "test"
    }
    form = DialogMessageForm(data)
    assert form.is_valid(), form.errors
    form.save()


def test_message_info_created(message, user, another_user):
    info = DialogMessageInfo.objects.get(message=message, person=user)
    another_info = DialogMessageInfo.objects.get(message=message, person=another_user)
    assert info.unread is False, info
    assert another_info.unread is True, another_info
