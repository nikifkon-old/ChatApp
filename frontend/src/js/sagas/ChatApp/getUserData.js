import { put, takeEvery, call, select } from 'redux-saga/effects'

import { getUserDataService } from '../../services'
import * as types from '../../actions'
import { getUserId } from '../../selectors/AuthSelectors'

function* getUserData() {
  const user_id = yield select(getUserId)
  try {
    const response = yield call(getUserDataService, user_id)
    yield put({
      type: types.GET_USER_DATA_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    yield put({
      type: types.GET_USER_DATA_FAILURE,
      payload: error
    })
  }
}

export default function*() {
    yield takeEvery('GET_USER_DATA_REQUEST', getUserData)
}
