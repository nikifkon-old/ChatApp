import pytest
from django.contrib.auth import get_user_model

from backend.dialogs.models import Dialog

User = get_user_model()


@pytest.fixture
def dialog():
    return Dialog.objects.create()
