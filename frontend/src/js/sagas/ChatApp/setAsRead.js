import { takeEvery, put, delay } from 'redux-saga/effects'

import * as types from '../../actions'
import * as events from '../../actions/websocketEvents'

let dialogsMessages = []

function* watchDialogMessages() {
  while(true) {
    yield delay(5000)
    
    if(dialogsMessages.length > 0) {
      yield put({
        type: types.WEBSOCKET_SEND_REQUEST,
        payload: {
          event: events.DIALOG_MESSAGES_SETASREAD, 
          data: {
            list: dialogsMessages
          }
        }
      })
      dialogsMessages = []
    }
  }
}

function* setAsRead({payload}) {
  dialogsMessages.push(payload)
}

function* setAsReadGroupMessage({payload}) {
  const { chat_id, message_id } = payload
  yield put({
    type: types.WEBSOCKET_SEND_REQUEST,
    payload: {
      event: events.GROUP_UPDATE_MESSAGE, 
      data: {
        id: message_id,
        unread: false,
      }
    }
  })
}

export default function* () {
  yield takeEvery(types.SET_AS_READ_DIALOG_MESSAGE, setAsRead)
  yield takeEvery(types.SET_AS_READ_GROUP_MESSAGE, setAsReadGroupMessage)
  yield watchDialogMessages()
}
