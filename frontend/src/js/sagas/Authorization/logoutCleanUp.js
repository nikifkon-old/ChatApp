import { takeEvery, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import * as types from '../../actions'

function* logout() {
  yield put({
    type: types.LOGOUT_USER
  })
  yield put({
    type: types.LOGIN_CLEAN_UP
  })
  yield put({
    type: types.SINGUP_CLEAN_UP
  })
  yield put({
    type: types.USER_DATA_CLEAN_UP
  })
  yield put({
    type: types.DIALOG_CLEAN_UP
  })
  yield put({
    type: types.WEBSOCKET_CLEAN_UP
  })
  yield put(push('/login'))
}

export default function*() {
  yield takeEvery(types.LOGOUT_CLEAN_UP, logout)
}
