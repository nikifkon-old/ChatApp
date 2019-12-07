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
  (events below same for dialog, group, channels, if other haven't said)
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
  - *`dialogs.list`:*
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

  - *`dialog.messages.setasread`:*
    - set as read messages 
    - data:
      - *list*, of messages, is required
        - *chat_id*, id of chat, is required
        - *message_id*, id of message, is required
    - example:
    ```
    {
        "event": "dialog.messages.setasread",
        "data": {
            "list": [
                {
                  "chat_id": "CHAT_ID",
                  "message_id": "MESSAGE_ID"
                }
            ]
        }
    }
    ```
  
  - *`dialog.message.star`:*
    - star dialog message for user
    - data:
      - *message_id*, id of message, is required
      - *star*, bool, star on unstar message, is required
    - example:'
    ```
    {
        "event": "dialog.message.star",
        "data": {
            "message_id": "MESSAGE_ID",
            "star": true
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

  - *`group.create`:*
    - create group
    - data:
      - *name*, name of group, is required,
      - *slug*, unique name of group, is required,
      - *description*, group description,
    - example:
    ```
    {
        "event": "group.create",
        "data": {
            "name": "GROUP_NAME",
            "slug": "GROUP_SLUG"
        }
    }
    ```

Deploy
----
- Update Apt: `sudo apt update`
- Install from apt-get: `sudo apt-get install python3-pip python-dev libpq-dev postgresql postgresql-contrib nginx supervisor redis-server`
- Install from pip: `sudo pip3 install psycopg2 virtualenv`
- Clone repo
- Move to project directory: `cd ChatApp`
- Create virtualenv: `virtualenv venv`
- Activate venv: `source venv/bin/activate`
- Install python dependences: `pip install -r requirements.txt`

- Run redis: `sudo systemctl enable redis-server.service`

Nginx
- `sudo ln config/nginx.conf /etc/nginx/sites-enabled`
- `sudo service nginx restart`

Npm
- `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash`
- reopen terminal
- `nvm install node`
- `nvm install --lts`

React
- `npm run build-production`
- `python manage.py collectstatic`

Postgres
- `sudo su - postgres`
- `createuser --interactive -P`
- `createdb --owner db_user django_db`
- `python manage.py makemigration`
- `python manage.py migrate`


Supervisor
- `sudo update-rc.d supervisor enable`
- `sudo rm /etc/supervisor/conf.d/supervisor.conf`
- `sudo ln config/supervisor.conf /etc/supervisor/conf.d/supervisor.conf`
- `sudo supervisorctl reread`
- `sudo supervisorctl update`
- `sudo supervisorctl status myproject`

Server logs:
- Nginx: `vim /var/log/nginx/`
- Daphne: `vim /var/log/myproject.log`
