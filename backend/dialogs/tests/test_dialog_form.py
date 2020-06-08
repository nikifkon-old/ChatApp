import pytest

from backend.dialogs.forms import DialogForm


pytestmark = [pytest.mark.django_db]


def test_successed(user, another_user):
    data = {"members": [user, another_user]}
    form = DialogForm(data)
    assert form.is_valid(), form.errors


def test_dialog_already_exist(user, another_user):
    data = {"members": [user, another_user]}
    form = DialogForm(data)
    form.save()

    second_form = DialogForm(data)
    assert not second_form.is_valid(), second_form.cleaned_data
    assert {"__all__": ["Dialog with these 2 person already exist"]} == second_form.errors, second_form.errors


def test_less_then_two_members(user):
    data = {"members": [user]}
    form = DialogForm(data)
    assert not form.is_valid(), form.cleaned_data
    assert {"__all__": ["Must have 2 members at least"]}
