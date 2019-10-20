import { put, takeEvery } from 'redux-saga/effects'

import * as types from '../../actions'
import * as events from '../../actions/websocketEvents'

export function* getMessagesInDialogs({payload: id}) {
  try {
    yield put({
      type: types.WEBSOCKET_SEND_REQUEST,
      payload: {
        event: events.DIALOG_GET,
        data: { id }
      }
    })

  } catch (error) {
    yield put({
      type: types.GET_DIALOG_DETAILS_FAILURE,
      payload: {
        error,
        id,
      }
    })
  }
}

export default function*() {
  yield takeEvery('GET_DIALOG_DETAILS_REQUEST', getMessagesInDialogs)
}
