import pytest
from django.contrib.auth import get_user_model

from backend.dialogs.forms import DialogForm

User = get_user_model()


@pytest.fixture
def dialog_data(user, another_user):
    return {"members": [user, another_user]}


@pytest.fixture
def dialog(dialog_data):
    return DialogForm(dialog_data).save()
