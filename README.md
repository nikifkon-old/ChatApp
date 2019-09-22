Django
----
- **make migrations**:
<code>
python manage.py makemigrations chat_messages dialogs groups profiles socket_chat
</code>

---------------

WebSocket URLs
-----
- **dialogs**: `ws:/localhost:8000/ws/dialog/__DIALOG_ID__`
- events:
  - *authenticate*:
    - authenticate user for auto insert *user id* in all event  
    - event: `authenticate`
    - data:
      - *access_token*, is required
    - example:<code>
      {"event": "authenticate", "data": {"access_token": "YOUR_TOKEN"}}
    </code>

  - *send message:*
    - send message in dialog(get id from URL)
    - data:
      - *text*, is required
    - example: <code>
    {"event": "send.message", "data": {"text": "YOUR_TEXT"}}
  </code>

  - *delete message:*
    - delete message by id
    - data:
      - *id*, is Required
    - example: <code>
      {"event": "delete.message", "data": {"id": "YOUR_ID"}}
    </code>

  - *update message:*
    - update message text
    - data:
      - *id*, is required,
      - *text*, is required
    - example: <code>
      {
        "event": "update.message",
        "data": {
        "id": "MESSAGE_ID",
        "text": "NEW_TEXT"
        }
      }
    </code>
