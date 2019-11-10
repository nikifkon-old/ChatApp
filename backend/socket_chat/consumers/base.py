from channels.generic.websocket import AsyncJsonWebsocketConsumer


def private(func):
    """ Provide private event with user objects """
    async def new_func(self, message, *args, **kwargs):
        user = self.user
        if user:
            return await func(self, message, *args, **kwargs)
        else:
            await self.throw_must_authenticate(message['event'])
    return new_func


class BaseConsumer(AsyncJsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user = None
        self.dialogs = []
        self._groups = []

    async def connect(self):
        await self.accept()

    async def method_unedefined(self, message):
        await self._throw_error({'detail': 'Undefined event'},
                                event=message['event'])

    async def parse_content(self, content):
        """ Validate request """
        if isinstance(content, dict) and isinstance(content.get('data'), dict) and content.get('event'):
            return content

    async def _send_message(self, data, event=None):
        await self.send_json(content={
            'status': 'ok',
            'data': data,
            'event': event
        })

    async def _throw_error(self, data, event=None):
        await self.send_json(content={
            'status': 'error',
            'data': data,
            'event': event
        })

    async def throw_missed_field(self, event=None):
        await self._throw_error({"detail": "Missed required fields"}, event=event)

    async def throw_must_authenticate(self, event=None):
        await self._throw_error({'detail': 'You must be authenticated'}, event=event)

    async def disconnect(self, code):
        """ Discard from all channels """
        if self.dialogs:
            for dialog in self.dialogs:
                await self.channel_layer.group_discard(
                    f'dialog_{dialog}',
                    self.channel_name
                )
        if self._groups:
            for group in self._groups:
                await self.channel_layer.group_discard(
                    f'group_{group}',
                    self.channel_name
                )
