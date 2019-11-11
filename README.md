Quick Start
---
- Clone Repo: `git clone https://github.com/nikifkon/ChatApp.git`
- Go to project folder: `cd ChatApp`
- Activate Virtualenv(optional):  `pip install virtualenv`
  - Create venv: `virtualenv venv`
  - Activate : `venv\Scripts\activate`(On Windows)
- Install python dependences `pip install -r requirements.txt`
- Install node.js dependences `npm install`
  - if you will get error, try this: `npm cache clean --force`
- Run Django dev Server: `python manage.py runserver`
- In new window, run Webpack hot-reload server: `npm run watch`

Django
----
- **make migrations**:
<code>
python manage.py makemigrations dialogs groups profiles socket_chat
</code>

- **run tests**:
<code>pytest</code>

---------------

WebSocket DOC
-----
- **base URL**: `ws:/localhost:8000/ws/main/`
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
    - get dialog details (messages)
    - data:
      - *id*, of dialog,
      - *filter*,  messages,
        maybe: `unread`, `stared`
    - example:
    ```
    {
        "event": "dialog.get",
        "data": {
          "id": "DIALOG_ID",
          "filter": "unread"
        }
    }
    ```
  - *`dialogs.list`(`groups.list`):*
    - get dialogs without messages
    - data:
      - *filter*, messages,
        maybe: `unread`, `stared`
    - example:
    ```
    {
        "event": "dialogs.list",
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
      - *text*, new text,
      - *unread* - bool, set as read,
      - *stared* - bool, set stared,
    - example:
    ```
    {
        "event": "dialog.update",
        "data": {
            "id": "MESSAGE_ID",
            "text": "NEW_TEXT",
        }
    }
    ```
