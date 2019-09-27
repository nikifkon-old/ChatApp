import { put, takeEvery, call, select } from 'redux-saga/effects'

import * as types from '../../actions'
import * as events from '../../actions/websocketEvents'
import { connectToWebSocketService } from '../../services'
import { getTokens } from '../../reducers/selectors'

export function* connectToWebSocket() {
  const tokens = yield select(getTokens)

  try {
    const response = yield call(connectToWebSocketService)

    yield put({
      type: types.WEBSOCKET_CONNECT_SUCCESS,
      payload: response.data
    })

    yield put({
      type: types.WEBSOCKET_SEND_REQUEST,
      payload: {
        event: events.AUTHENTICATE,
        data: {
          access_token: tokens.access
        }
      }
    })
  } catch (error) {
    yield put({
      type: types.WEBSOCKET_CONNECT_FAILURE,
      payload: error
    })
  }
}

export default function*() {
  yield takeEvery(types.WEBSOCKET_CONNECT_REQUEST, connectToWebSocket)
}
