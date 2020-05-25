import pytest

pytestmark = [pytest.mark.django_db]


def test_str(user):
    assert str(user) == user.username
