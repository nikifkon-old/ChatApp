import jwt
from django.conf import settings
from django.contrib.auth.models import User
from channels.generic.websocket import AsyncJsonWebsocketConsumer


def private(func):
    """ Provide private event with user objects """
    async def new_func(*args, **kwargs):
        user = args[0].user
        if user:
            return await func(*args, **kwargs)
        else:
            await args[0]._throw_error({'detail': 'You must be authenticated'},
                                       event=args[1]['event'])
    return new_func


class BaseConsumer(AsyncJsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user = None

    async def connect(self):
        await self.accept()

    async def receive_json(self, content):
        """ Event managment """
        message = await self.parse_content(content)
        if message:
            event = message['event'].replace('.', '_')
            method = getattr(self, f'event_{event}', self.method_unedefined)
            await method(message)
        else:
            await self._throw_error({'detail': 'Invalid format'})

    async def event_authenticate(self, message):
        """ User Authorization """
        try:
            token = message['data']['access_token']
            data = jwt.decode(token, settings.SECRET_KEY)
            user = User.objects.get(id=data['user_id'])
            self.user = user
            await self._send_message({'detail': 'Authorization successed'},
                                     event=message['event'])
            if getattr(self, 'on_authenticate_success'):
                await self.on_authenticate_success()
        except:
            await self._throw_error({'detail': 'Authorization failed'})

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

    async def throw_missed_filed(self, event=None):
        await self._throw_error({"detail": "Missed required fields"}, event=event)

    async def disconnect(self, code):
        print(code)
