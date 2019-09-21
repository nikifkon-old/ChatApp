import { takeEvery } from 'redux-saga/effects'
import * as types from '../../actions'
import { sendMessage } from '../../components/Chat/Websockets/dialogs'

export function* sendNewMessage({payload: text}) {
  const data = {
    event: 'send.message',
    data: {
      text: text
    }
  }
  sendMessage(data)
  yield
}

export default function*() {
  yield takeEvery(types.SEND_MESSAGE, sendNewMessage)
}
