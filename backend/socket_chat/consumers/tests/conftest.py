import pytest
from channels.testing import WebsocketCommunicator
from config.asgi import application


@pytest.fixture
@pytest.mark.asyncio
async def com() -> WebsocketCommunicator:
    communicator = WebsocketCommunicator(application, 'ws/main/')
    connected, _ = await communicator.connect()
    assert connected
    return communicator
