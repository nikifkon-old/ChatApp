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

  - *`dialog.send`:*
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

  - *`dialog.delete`:*
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

  - *`dialog.update`:*
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
