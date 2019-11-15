import { takeEvery, put, debounce } from 'redux-saga/effects'

import * as types from '../../actions'
import * as events from '../../actions/websocketEvents'

let dialogsMessages = []
let groupsMessages = []

function* groupSetAsRead() {
  if(groupsMessages.length > 0) {
    yield put({
      type: types.WEBSOCKET_SEND_REQUEST,
      payload: {
        event: events.GROUP_MESSAGES_SETASREAD, 
        data: {
          list: groupsMessages
        }
      }
    })
    groupsMessages = []
  }
}

function* dialogSetAsRead() {
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

function* pushDialogMessage({payload}) {
  dialogsMessages.push(payload)
}

function* pushGroupMessage({payload}) {
  groupsMessages.push(payload)
}

export default function* () {
  yield takeEvery(types.SET_AS_READ_DIALOG_MESSAGE, pushDialogMessage)
  yield takeEvery(types.SET_AS_READ_GROUP_MESSAGE, pushGroupMessage)
  yield debounce(3000, () => dialogsMessages.length > 0, dialogSetAsRead)
  yield debounce(3000, () => groupsMessages.length > 0, groupSetAsRead)
}
