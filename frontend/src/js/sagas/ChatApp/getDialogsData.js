import { put, takeEvery, call, select } from 'redux-saga/effects'

import * as types from '../../actions'
import { getDialogsDataService } from '../../services'
import { selectUserId } from '../../reducers/Authorization/authReducer'

export function* getDialogsData() {
  const user_id = yield select(selectUserId)
  try {
    const response = yield call(getDialogsDataService, user_id)
    yield put({
      type: types.GET_DIALOGS_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    yield put({
      type: types.GET_DIALOGS_FAILURE,
      payload: error
    })
  }
}

export default function*() {
  yield takeEvery('GET_DIALOGS_REQUEST', getDialogsData)
}
