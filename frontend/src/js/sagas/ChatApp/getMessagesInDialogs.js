import { put, takeEvery, call } from 'redux-saga/effects'

import * as types from '../../actions'
import { getMessagesInDialogService } from '../../services'

export function* getMessagesInDialogs({payload: dialog_id}) {
  try {
    const response = yield call(getMessagesInDialogService, dialog_id)
    yield put({
      type: types.GET_MESSAGES_IN_DIALOG_SUCCESS,
      payload: {
        data: response.data,
        dialog_id
      }
    })
  } catch (error) {
    yield put({
      type: types.GET_MESSAGES_IN_DIALOG_FAILURE,
      payload: {
        error,
        dialog_id
      }
    })
  } finally {
    yield put({
      type: types.SET_ACTIVE_DIALOG,
      payload: dialog_id
    })
  }
}

export default function*() {
  yield takeEvery('GET_MESSAGES_IN_DIALOG_REQUEST', getMessagesInDialogs)
}
