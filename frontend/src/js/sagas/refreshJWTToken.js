import { takeEvery, put, call } from 'redux-saga/effects'

import { refreshTokenService } from '../services'
import * as types from '../actions'

function* refreshJWTToken() {
  try {
    const response = yield call(refreshTokenService, getRefreshToken())
    yield put({
      type: types.REFRESH_ACCESS_TOKEN_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    yield put({
      type: types.REFRESH_ACCESS_TOKEN_FAILURE,
      payload: error.response
    })
  }
}

function getRefreshToken() {
  return localStorage.getItem('refresh_token')
}

export default function*() {
  yield takeEvery(types.REFRESH_ACCESS_TOKEN_REQUEST, refreshJWTToken)
}
