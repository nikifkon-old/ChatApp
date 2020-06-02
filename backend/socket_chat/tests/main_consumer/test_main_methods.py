import pytest
from channels.testing import WebsocketCommunicator
from channels.consumer import AsyncConsumer
from pytest_mock import MockFixture
from django.contrib.auth import get_user_model


User = get_user_model()
pytestmark = [pytest.mark.asyncio]


async def test_auth_empty_data(yml_dataset: dict, com: WebsocketCommunicator, error_status: str):
    test_data = yml_dataset['test_auth_empty_data']

    await com.send_json_to(test_data['request_data'])
    response = await com.receive_json_from()
    assert response["status"] == error_status
    assert response["data"] == test_data['expected_response']


async def test_auth_invalid_token(yml_dataset: dict, com: WebsocketCommunicator, error_status: str):
    test_data = yml_dataset['test_auth_invalid_token']

    await com.send_json_to(test_data['request_data'])
    response = await com.receive_json_from()
    assert response["status"] == error_status
    assert response["data"] == test_data['expected_response']


@pytest.mark.django_db
async def test_auth_valid_token(yml_dataset: dict, com: WebsocketCommunicator, auth_request,
                                access_token, ok_status: str, user: User):
    test_data = yml_dataset['test_auth_valid_token']

    await com.send_json_to(auth_request(access_token(user)))
    response = await com.receive_json_from(test_data['timeout'])
    assert response["status"] == ok_status
    assert response["data"] == test_data['expected_response']


@pytest.mark.django_db
async def test_auth_expired_token(yml_dataset, com: WebsocketCommunicator, auth_request,
                                  access_token, error_status: str, user: User):
    test_data = yml_dataset['test_auth_expired_token']

    lst = list(access_token(user))
    lst[15] = lst[15].swapcase()
    access_token = ''.join(lst)

    await com.send_json_to(auth_request(access_token))
    response = await com.receive_json_from()
    assert response["status"] == error_status
    assert response["data"] == test_data['expected_response']


@pytest.mark.django_db
async def test_on_authenticate(com: WebsocketCommunicator, consumer: AsyncConsumer,
                               mocker: MockFixture, auth_request, access_token, user: User):
    on_auth = mocker.spy(consumer, 'on_authenticate_success')

    await com.send_json_to(auth_request(access_token(user)))
    await com.receive_json_from()

    on_auth.assert_called_once()


async def test_recieve_json_undefined_method(yml_dataset: dict, com: WebsocketCommunicator, error_status: str):
    test_data = yml_dataset['test_recieve_json_undefined_method']

    await com.send_json_to(test_data['request_data'])
    response = await com.receive_json_from()
    assert response["status"] == error_status
    assert response["data"] == test_data['expected_response']
