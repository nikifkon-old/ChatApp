import { put, takeEvery, call } from 'redux-saga/effects'

import * as types from '../../actions'
import { sendToWebsokcet } from '../../services'

export function* sendToWebsokcetSaga({payload: event}) {
  try {
    yield call(sendToWebsokcet, event)

    yield put({
      type: types.WEBSOCKET_SEND_SUCCESS
    })

  } catch (error) {
    console.log(error);
    yield put({
      type: types.WEBSOCKET_SEND_FAILURE,
      payload: error
    })
  }
}

export default function*() {
  yield takeEvery(types.WEBSOCKET_SEND_REQUEST, sendToWebsokcetSaga)
}
