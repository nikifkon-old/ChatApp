from channels.db import database_sync_to_async


class EventsDBMixin:
    @database_sync_to_async
    def get_messages(self, id_, user_id, filter_=None):
        """ Get chat with messages """
        return self.view.get(id_, with_messages=True, filter_=filter_)

    @database_sync_to_async
    def get_list(self, filter_: str = None):
        """ Get list of chats without messages """
        return self.view.list(filter_=filter_)

    @database_sync_to_async
    def send_message(self, id_, text):
        """ Create message in Database """
        data, sended = self.view.send_message(id_, text)
        return data, sended

    @database_sync_to_async
    def delete_message(self, id_):
        """ Delete message in Database """
        data, deleted = self.view.delete_message(id_)
        return data, deleted

    @database_sync_to_async
    def update_message(self, id_, text):
        """ Update message in Database """
        data, updated = self.view.update_message(id_, text)
        return data, updated

    @database_sync_to_async
    def set_as_read(self, messages):
        self.view.set_as_read(messages)

    @database_sync_to_async
    def create_chat(self, id_):
        """ Create chat in Database """
        data, created = self.view.create(id_)
        return data, created

    @database_sync_to_async
    def delete_chat(self, id_):
        """ Delete chat in Databese """
        data, deleted = self.view.delete(id_)
        return data, deleted

    @database_sync_to_async
    def star_message(self, id_, stared):
        data, stared = self.view.star_message(id_, stared)
        return data, stared
