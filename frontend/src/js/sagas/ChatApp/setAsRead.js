import { takeEvery, put } from 'redux-saga/effects'

import * as types from '../../actions'
import * as events from '../../actions/websocketEvents'


function* setAsRead({payload}) {
  const { chat_id, message_id } = payload
  yield put({
    type: types.WEBSOCKET_SEND_REQUEST,
    payload: {
      event: events.DIALOG_UPDATE_MESSAGE, 
      data: {
        id: message_id,
        unread: false,
      }
    }
  })
}

export default function* () {
  yield takeEvery(types.SET_AS_READ_DIALOG_MESSAGE, setAsRead)
}
