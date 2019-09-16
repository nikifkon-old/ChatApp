import { put, takeEvery, select } from 'redux-saga/effects'
import * as types from '../../actions'
import { getUserId, getUserInfo, getActiveDialogId } from '../../reducers/selectors'


export function* addNewMessage({payload: text}) {
  const date = new Date()
  const user_id = yield select(getUserId)
  const user_data = yield select(getUserInfo)
  const activeDialog = yield select(getActiveDialogId)
  yield put({
    type: types.ADD_NEW_MESSAGE,
    payload: {
      id: 11, // by websocket
      sender: user_id,
      sender_name: user_data.user,
      avatar: user_data.avatar,
      dialog: activeDialog,
      text: text,
      date: date.toLocaleString(),
    }
  })
}

export default function*() {
  yield takeEvery(types.ADD_NEW_MESSAGE_REQUEST, addNewMessage)
}
