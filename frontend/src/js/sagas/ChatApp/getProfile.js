import { takeEvery, call, put } from 'redux-saga/effects'

import * as types from '../../actions'
import { getUserDataService, updateUserDataService } from '../../services'

function* getProfile({payload: { id }}) {
  try {
    const response = yield call(getUserDataService, id)
    yield put({
      type: types.GET_PROFILE_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    yield put({
      type: types.GET_PROFILE_FAILURE,
      payload: error
    })
  }
}

function* updateProfile({payload}) {
  const { user_id, data } = payload
  try {
    const response = yield call(updateUserDataService, {user_id, data})
    yield put({
      type: types.UPDATE_PROFILE_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    yield put({
      type: types.UPDATE_PROFILE_FAILURE,
      payload: error
    })
  }

}

export default function*() {
  yield takeEvery(types.GET_PROFILE_REQUEST, getProfile)
  yield takeEvery(types.UPDATE_PROFILE_REQUEST, updateProfile)
}