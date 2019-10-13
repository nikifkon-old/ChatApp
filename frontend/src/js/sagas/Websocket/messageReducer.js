import { takeEvery, put } from 'redux-saga/effects'

import * as types from '../../actions'
import * as events from '../../actions/websocketEvents'

function* MessageReducer({payload: event}) {
  switch (event.event) {
    case events.AUTHENTICATE:
      if (event.status === 'ok') {
        console.log('%c%s', 'color: green;', 'authenticate success')
        yield put({
          type: types.WEBSOCKET_CONNECT_SUCCESS,
          payload: {
            response: {
              ...event.data
            }
          }
        })
      } else {
        yield put({
          type: types.WEBSOCKET_CONNECT_FAILURE,
          payload: {
            response: {
              ...event.data,
              status: 401
            }
          }
        })
        console.log('%c%s', 'color: red;', event.data.detail);
      }
      break

    case events.DIALOG_GET:
      if(event.status === 'ok') {
        yield put({
          type: types.SET_DIALOG_DATA,
          payload: event.data
        })
      } else {
        console.log(event.data.detail);
        yield put({
          type: types.GET_DIALOGS_FAILURE,
          payload: event.data.detail
        })
      }
      break

    case events.DIALOG_SEND:
      if (event.status === 'ok') {
        yield put({
          type: types.PUSH_RECEIVE_MESSAGE_IN_DIALOG,
          payload: event.data
        })
      } else {
        console.log(event.data.detail);
      }
      break

    case events.DIALOG_DELETE_MESSAGE:
      if (event.status === 'ok') {
        yield put({
          type: types.DELETE_DIALOG_MESSAGE,
          payload: event.data
        })
      } else {
        console.log(event.data.detail);
      }
      break

    case events.DIALOG_UPDATE_MESSAGE:
      if (event.status === 'ok') {
        yield put({
          type: types.UPDATE_DIALOG_MESSAGE,
          payload: event.data
        })
      } else {
        console.log(event.data.detail);
      }
      break

    default:
      yield
  }
}

export default function* () {
  yield takeEvery(types.WEBSOCKET_RECEIVE_MESSAGE, MessageReducer)
}
