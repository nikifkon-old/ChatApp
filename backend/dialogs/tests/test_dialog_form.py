import pytest
from django.contrib.auth import get_user_model

from backend.dialogs.forms import DialogForm


User = get_user_model()
pytestmark = [pytest.mark.django_db]


def test_successed(user: User, another_user: User):
    data = {"members": [user, another_user]}
    form = DialogForm(data)
    assert form.is_valid(), form.errors


def test_dialog_already_exist(yml_dataset: dict, user: User, another_user: User):
    data = {"members": [user, another_user]}
    form = DialogForm(data)
    form.save()

    second_form = DialogForm(data)
    assert not second_form.is_valid(), second_form.cleaned_data
    assert yml_dataset["test_dialog_form"]["dilog_already_exist_error_message"] == second_form.errors, second_form.errors


def test_less_then_two_members(yml_dataset: dict, user: User):
    data = {"members": [user]}
    form = DialogForm(data)
    assert not form.is_valid(), form.cleaned_data
    assert yml_dataset["test_dialog_form"]["less_then_two_members_error_message"] == form.errors, form.errors
