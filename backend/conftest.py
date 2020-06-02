import os

import pytest
from django.contrib.auth import get_user_model

import yaml

User = get_user_model()


@pytest.fixture
def yml_dataset(request) -> dict:
    dirname = os.path.abspath(os.path.dirname(request.module.__file__))
    with open(os.path.join(dirname, 'dataset.yml')) as file:
        return yaml.safe_load(file)


@pytest.fixture
def get_yml_dataset() -> dict:
    def func(file):
        dirname = os.path.abspath(os.path.dirname(file))
        with open(os.path.join(dirname, 'dataset.yml')) as file:
            return yaml.safe_load(file)
    return func


@pytest.fixture
def user_serialized_data(get_yml_dataset) -> dict:
    return get_yml_dataset(__file__)["user_serialized_data"]


@pytest.fixture
def user(get_yml_dataset) -> User:
    return User.objects.create(**get_yml_dataset(__file__)["user_data"])


@pytest.fixture
def another_user_serialized_data(get_yml_dataset) -> dict:
    return get_yml_dataset(__file__)["another_user_serialized_data"]


@pytest.fixture
def another_user(get_yml_dataset) -> User:
    return User.objects.create(**get_yml_dataset(__file__)["another_user_data"])
