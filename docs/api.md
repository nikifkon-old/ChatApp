# API reference

## Models
### Dialog:

| field | type |  description |
|----------|------------|-----|
| `id` |  int | Id of dialog |
| `messages` | Dialog Messages | Dialog messages with request parameter filter |
| `interlocutor` | User | Second person in dialog |
| `unread_count` | int | Count of unread filtered messages in dialog |
| `last_message` | Dialog Message | last sent filtered message |

### Dialog Message:
| field | type |  description |
|----------|------------|-----|
| `id` |  int | Id of Message |
| `sender` | int | Id of User who sent this message |
| `sender_name` | str | Username of User who sent this message |
| `avatar` | str | Link to avatar of User who sent this message |
| `chat_id` | int | Id of Dialog |
| `text` | str | Message text |
| `unread` | bool | Is this message unread for authenticate person |
| `stared` | bool | Is this message stared for authenticate person |
| `date` | str, format: %Y-%m-%dT%H:%M:%S.%fZ | Date when messages was sent TODO: or updated? |

### Group
| field | type |  description |
|----------|------------|-----|
| `id` | int | Id of Group |
| `name` | str | titile of Group |
| `slug` | str | Group's unique title |
| `img` | str | Link to Group's avatar |
| `description` | str | Aditional information about Group |
| `messages` | Group Messages | Group messages with request parameter filter |
| `members` | Users | User list who joined in the group |
| `unread_count` | int | Count of unread filtered messages(for auth user) in the Group |
| `last_message` | Short Group Message | last sent filtered message |

### Group Message:
| field | type |  description |
|----------|------------|-----|
| `id` | int | Id of Message |
| `sender` | int | Id of User who sent this message |
| `sender_name` | str | Username of User who sent this message |
| `avatar` | str | Link to avatar of User who sent this message |
| `chat_id` | int | Id of Group |
| `text` | str | Message text |
| `unread` | bool | Is this message unread for authenticate person |
| `unread` | bool | Is this message stared for authenticate person |
| `date` | str | Date when messages was sent TODO: or updated? |

### Short Group Message:
| field | type |  description |
|----------|------------|-----|
| `sender` | int | Id of User who sent this message |
| `chat_id` | int | Id of Group |
| `text` | str | Message text |

### User:
| field | type |  description |
|----------|------------|-----|
| `username` | str | Username |
| `avatar` | str | Link to Avatar of user |
| `tel` | str | Phone number of user |
| `birth` | str | User's Date of birth |
| `gender` | str | Gender of user |

## Websocket API
- **base URL**: `ws:/localhost:8000/ws/main/`
- all data transmitted by JSON. responses format like this:
```
{
    "event": "ROOM.EVENT",
    "data": {},
    status: "ok" | "error"
}
```
| param | type |  description |
|----------|------------|-----|
| `event` |  str | Action type |
| `data` | dict | Result of action or request data |
| `status` | one of: "ok", "error" | Action status |

### General Responses error

| status | room |data | description |
|----------|------|------|-----|
| error | - | {"detail': "Invalid format"} | Json format doesn't match above |
| error | - | {"detail": "You must be authenticated"} | Don't authenticated request on private event |
| error | - | {"detail": "Missed required fields"} | request data fields don't contain required property |
| error | - | {"detail": "Undefined event"} | Event doesn't exist |

TODO: private event
TODO: response typing

### Events:
  - *`authenticate`:*
    - authenticate for identify user in other event
    - response data:

        | status | room |data | description |
        |----------|-----|-------|-----|
        | ok | - | {"detail": "Authorization successed"} | User authorization successed |
        | error | - |  {"detail": "Access token must not be empty"} | Received token is blank string |
        | error | - |  {"detail": "Token is not valid"} | Received token may be expired or not valid |
        
    - request:
    
        | param | type |  description | is_required |
        |----------|------------|-----|-----|
        | `access_token` | str | Access JWT token | true |
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
    - response data:

        | status | room |data | description |
        |----------|-------|-----|-----|
        | ok | - | Dialog | Dialog with filter matching messages |
        TODO: doesnot exist
    - request:
    
        | param | type |  description | is_required |
        |----------|------------|-----|-----|
        | `id` |  int | Id of dialog | true |
        | `filter` | str, one of `unread`, `stared` ' | Filter option message's in dialog | false |
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
    TODO: rename to `dialog.list`
    - get dialogs without messages
    - response data:

        | status | room |data | description |
        |----------|-----|-------|-----|
        | ok | - | list of Dialogs | dialog with filter matching messages |
    - request data:
    
        | param | type |  description | is_required |
        |----------|------------|-----|-----|
        | `filter` | str, one of `unread`, `stared` | Filter option message's in dialog | false |
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
    - response data:

        | status | room |data | description |
        |----------|------|------|-----|
        | ok | (chat_name)_(chat_id) | {"id"} | Return id of deleted dialog |
        | error | - | {"detail": "(chat_name) doesn't exist"} | Dialog with given id doesn't exist |
    - request data:
    
        | param | type |  description | is_required |
        |----------|------------|-----|-----|
        | `id` | int | Id of dialog | true |
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
    - response data:

        | status | room | data | description |
        |----------|------|-------|------|
        | ok | (chat_name)_(chat_id) | Dialog Message | Return new message |
        TODO: dialog doesnot exist
    - request data:
    
        | param | type |  description | is_required |
        |----------|------------|-----|-----|
        | `id` | int | Id of dialog | true |
        | `text` | int | Text of message | true |
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
    - response data:
        | status | room | data | description |
        |----------|-----|-------|-----|
        | ok | (chat_name)_(chat_id) | dict: {"chat_id", "messages_id"} | Return ids of dialog and deleted message
        | error | - | {"detail": "Message doesn't exist"} | Message with given id doesn't exist
        | error | - | {"detail": "You can't delete foreign message"} | Message with given id is foreign, so you can't delete it
    - request data:
    
        | param | type |  description | is_required |
        |----------|------------|-----|-----|
        | `id` | int | Id of message | true |
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
    - response data:

        | status | room | data | description |
        |----------|------|-------|------|
        | ok | (chat_name)_(chat_id) | Dialog Message | Return updated message |
        | error | - | {"detail": "Message doesn't exist"} | Message with given id doesn't exist
        | error | - | {"detail": "You can't update foreign messages"} | Message with given id is foreign, so you can't update it
    - request data:
    
        | param | type |  description | is_required |
        |----------|------------|-----|-----|
        | `id` | int | Id of message | true |
        | `text` | int | New text of message | true |
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
    - response data:

        | status | room | data | description |
        |----------|------|-------|------|
        | ok | no response | TODO: ?
        TODO: message doesnot exist
    - request data:
    
        | param | type |  description | is_required |
        |----------|------------|-----|-----|
        | `list` | dict: {"chat_id", "message_id"} | List of messages you want to set as read | true |
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
    - response data:

        | status | room | data | description |
        |----------|------|-------|------|
        | ok | - | {"id", "stared"} | Return id of (un)stared message and its state |
        TODO: message doesnot exist
    - request data:
    
        | param | type |  description | is_required |
        |----------|------------|-----|-----|
        | `id` | int | Id of message | true |
        | `stared` | bool | New value of star property | true |
    - example:'
    ```
    {
        "event": "dialog.message.star",
        "data": {
            "id": "MESSAGE_ID",
            "stared": true
        }
    }
    ```

  - *`dialog.create`:*
    - create dialog & and add requesting user and user with passed id to this
    - response data:
        | status | room | data | description |
        |----------|------|-------|------|
        | ok | general -> (chat_name)_(chat_id) | {(user_id): Dialog, (interlocutor_id): Dialog, "chat_id"} -> Dialog | Return dialog for two user (in general), then connect them into new room send each of them rigth version of Dialog
        | error | - | {"detail": "User does not exist"} | User with given id doesn't exist |
        | error | - | {"detail": "Dialog with these 2 person already exist"} | Dialog with you and user with given id already exist |
    - request:
    
        | param | type |  description | is required |
        |----------|------------|-----|-----|
        | `id` |  int | Id of dialog | true |
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
    - response data:
        | status | room | data | description |
        |----------|------|-------|------|
        | ok | general -> (chat_name)_(chat_id) | {(user_id): Group, "chat_id"} -> Group | Return new Group |
        | error | - | {"detail": "slug - \`(given_slug)\` has already taken"} | Group with given slug already exist and it must be unique
    - request data:
    
        | param | type |  description | is_required |
        |----------|------------|-----|-----|
        | `name` | str | Title of group | true |
        | `slug` | str | Unique title of group | true |
        | `description` | str | Aditional information about Group | false |
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