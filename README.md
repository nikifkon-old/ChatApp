Django
----
- **make migrations**:
<code>
python manage.py makemigrations dialogs groups profiles socket_chat
</code>

---------------

WebSocket DOC
-----
- **base URL**: `ws:/localhost:8000/ws/main`
- events:
  - *`authenticate`:*
    - authenticate user for auto insert *user id* in all event
    - data:
      - *access_token*, is required
    - example:
    ```
    {
        "event": "authenticate",
        "data": {
          "access_token": "YOUR_TOKEN"
        }
    }
    ```
  - *`dialog.get`:*
    - get messages in user's dialogs
    - data:
      - *filter*,  messages,
        maybe: `unread`, `stared`
    - example:
    ```
    {
        "event": "dialog.get",
        "data": {
          "filter": "unread"
        }
    }
    ```
  - *`dialog.create`:*
    - create dialog & and add requesting user and user with passed id to this
    - data:
      - *id*, of user, is required
    - example:
    ```
    {
        "event": "dialog.create",
        "data": {
          "id": "USER_ID"
        }
    }
    ```
  - *`dialog.delete`:*
    - delete dialog by id
    - data:
      - *id*, of dialog, is required
    - example:
    ```
    {
        "event": "dialog.delete",
        "data": {
          "id": "DIALOG_ID"
        }
    }
    ```
  - *`dialog.message.send`:*
    - send message in dialog
    - data:
      - *id*, of dialog, is required
      - *text*, is required
    - example:
    ```
    {
        "event": "dialog.send",
        "data": {
          "id": "DIALOG_ID",
          "text": "YOUR_TEXT"
        }
    }
    ```

  - *`dialog.message.delete`:*
    - delete message by id
    - data:
      - *id*, of message, is required
    - example:
    ```
    {
        "event": "dialog.delete",
        "data": {
          "id": "MESSAGE_ID"
        }
    }
    ```

  - *`dialog.message.update`:*
    - update message text
    - data:
      - *id*, of message, is required,
      - *text*, new text, is required
    - example:
    ```
    {
        "event": "dialog.update",
        "data": {
            "id": "MESSAGE_ID",
            "text": "NEW_TEXT"
        }
    }
    ```
