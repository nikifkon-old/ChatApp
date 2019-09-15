import { put, takeEvery, call, select } from 'redux-saga/effects'

import * as types from '../../actions'
import { getDialogsDataService } from '../../services'
import { selectUserId } from '../../reducers/Authorization/authReducer'

export function* getDialogsData() {
  const user_id = yield select(selectUserId)
  let response
  try {
    response = yield call(getDialogsDataService, user_id)
    yield put({
      type: types.GET_DIALOGS_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    yield put({
      type: types.GET_DIALOGS_FAILURE,
      payload: error
    })
  } finally {
    // display first dialog
    const firstDialog = response.data[0].id
    yield put({
      type: types.GET_MESSAGES_IN_DIALOG_REQUEST,
      payload: firstDialog
    })
  }
}

export default function*() {
  yield takeEvery('GET_DIALOGS_REQUEST', getDialogsData)
}
