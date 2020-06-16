import pytest
from django.contrib.auth import get_user_model

from backend.dialogs.forms import DialogForm
from backend.dialogs.models import Dialog

User = get_user_model()


@pytest.fixture
def dialog_data(user: User, another_user: User) -> dict:
    return {"members": [user, another_user]}


@pytest.fixture
def dialog(dialog_data: dict) -> Dialog:
    return DialogForm(dialog_data).save()
