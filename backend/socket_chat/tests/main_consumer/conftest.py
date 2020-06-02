import pytest
from channels.consumer import AsyncConsumer

from config.asgi import application


@pytest.fixture
def consumer(ws_url) -> AsyncConsumer:
    return application.application_mapping['websocket']\
        .routes[0].resolve(ws_url).func
