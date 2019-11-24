import { takeEvery, put } from 'redux-saga/effects'

import * as types from '../../actions'
import * as events from '../../actions/websocketEvents'

function* MessageReducer({payload: event}) {
  if (event.event === events.AUTHENTICATE) {
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
    }
  }

  else if (event.status === 'ok') {
    switch (event.event) {
      case events.DIALOGS_LIST:
        yield put({
          type: types.SET_DIALOGS_DATA,
          payload: event.data
        })
        break

      case events.GROUPS_LIST:
        yield put({
          type: types.SET_GROUPS_DATA,
          payload: event.data
        })
        break

      case events.DIALOG_GET:
        yield put({
          type: types.SET_DIALOG_DATA,
          payload: event.data
        })
        break

      case events.GROUP_GET:
        yield put({
          type: types.SET_GROUP_DATA,
          payload: event.data
        })
        break

      case events.DIALOG_SEND:
        yield put({
          type: types.PUSH_RECEIVE_MESSAGE_IN_DIALOG,
          payload: event.data
        })
        break

      case events.GROUP_SEND:
        yield put({
          type: types.PUSH_RECEIVE_MESSAGE_IN_GROUP,
          payload: event.data
        })
        break

      case events.DIALOG_DELETE_MESSAGE:
        yield put({
          type: types.PUSH_NOTIFICATION,
          payload: 'Message deleted successfully'
        })
        yield put({
          type: types.DELETE_DIALOG_MESSAGE,
          payload: event.data
        })
        break

      case events.GROUP_DELETE_MESSAGE:
        yield put({
          type: types.PUSH_NOTIFICATION,
          payload: 'Message deleted successfully'
        })
        yield put({
          type: types.DELETE_GROUP_MESSAGE,
          payload: event.data
        })
        break

      case events.DIALOG_UPDATE_MESSAGE:
        yield put({
          type: types.PUSH_NOTIFICATION,
          payload: 'Message updated successfully'
        })
        yield put({
          type: types.UPDATE_DIALOG_MESSAGE,
          payload: event.data
        })
        break

      case events.GROUP_UPDATE_MESSAGE:
        yield put({
          type: types.PUSH_NOTIFICATION,
          payload: 'Message updated successfully'
        })
        yield put({
          type: types.UPDATE_GROUP_MESSAGE,
          payload: event.data
        })
        break

      case events.DIALOG_CREATE:
        yield put({
          type: types.PUSH_NOTIFICATION,
          payload: 'Dialog created successfully'
        })
        yield put({
          type: types.PUSH_NEW_DIALOG,
          payload: event.data
        })
        break
        
      case events.GROUP_CREATE:
        yield put({
          type: types.PUSH_NOTIFICATION,
          payload: 'Group created successfully'
        })
        yield put({
          type: types.PUSH_NEW_GROUP,
          payload: event.data
        })
        break
      
      case events.DIALOG_DELETE:
        yield put({
          type: types.PUSH_NOTIFICATION,
          payload: 'Dialog delete successfully'
        })
        yield put({
          type: types.POP_DIALOG,
          payload: event.data
        })
        break
      
      case events.GROUP_DELETE:
        yield put({
          type: types.PUSH_NOTIFICATION,
          payload: 'Group delete successfully'
        })
        yield put({
          type: types.POP_GROUP,
          payload: event.data
        })
        break
      
      case events.DIALOG_MESSAGE_STAR:
        yield put({
          type: types.UPDATE_DIALOG_MESSAGE,
          payload: event.data
        })
        break

      case events.GROUP_MESSAGE_STAR:
        yield put({
          type: types.UPDATE_GROUP_MESSAGE,
          payload: event.data
        })
        break

      default:
        yield
    }
  } else {
    yield put({
      type: types.PUSH_NOTIFICATION,
      payload: event.data.detail
    })
  }
}

export default function* () {
  yield takeEvery(types.WEBSOCKET_RECEIVE_MESSAGE, MessageReducer)
}
