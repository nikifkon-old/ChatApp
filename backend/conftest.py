import os

import pytest
from django.contrib.auth import get_user_model

import yaml

User = get_user_model()


@pytest.fixture
def local_dataset(request) -> dict:
    def func(test_file):
        dirname = os.path.abspath(os.path.dirname(test_file))
        with open(os.path.join(dirname, 'dataset.yml')) as file:
            return yaml.safe_load(file)
    return func


@pytest.fixture
def user(local_dataset):
    return User.objects.create(**local_dataset(__file__)['user_data'])
