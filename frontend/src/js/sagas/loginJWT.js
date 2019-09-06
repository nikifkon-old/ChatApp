import { takeEvery, put, call } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import { loginUserService } from '../services'
import * as types from '../actions'

function* loginJWT(action) {
  const { payload } = action
  try {
    const response = yield call(loginUserService, payload)
    yield put({
      type: types.LOGIN_WITH_JWT_SUCCESS,
      payload: response.data
    })
    yield put({
      type: types.SET_JWT_TOKENS,
      payload: response.data
    })
    yield put({
      type: types.SET_USER_ID
    })
    yield put(push('/app'))
  } catch (error) {
    yield put({
      type: types.LOGIN_WITH_JWT_FAILURE,
      payload: error.response
    })
  }
}

export default function*() {
  yield takeEvery(types.LOGIN_WITH_JWT_REQUEST, loginJWT)
}
