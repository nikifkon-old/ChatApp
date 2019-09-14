import { takeEvery, put, call } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import { singUpUserService } from '../../services'
import * as types from '../../actions'

function* loginJWT(action) {
  const { payload } = action
  try {
    yield call(singUpUserService, payload)
    yield put({
      type: types.SINGUP_USER_SUCCESS
    })
    yield put({
      type: types.LOGIN_WITH_JWT_REQUEST,
      payload: payload
    })
    yield put(push('/app'))
  } catch (error) {
    yield put({
      type: types.SINGUP_USER_FAILURE,
      payload: error.response
    })
  }
}

export default function*() {
  yield takeEvery(types.SINGUP_USER_REQUEST, loginJWT)
}
