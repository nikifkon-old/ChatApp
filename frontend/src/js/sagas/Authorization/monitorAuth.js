import { takeEvery, race, take, put } from 'redux-saga/effects'
import * as types from '../../actions'

const ignoreActionTypes = ['REFRESH_ACCESS_TOKEN']

function monitorableAction(action) {
  return action.type.includes('REQUEST') && ignoreActionTypes
    .every(fragment => !action.type.includes(fragment))
}

function identifyAction(action) {
  return action.type.split('_').slice(0, -1).join('_')
}
function getSuccessType(action) {
  return `${identifyAction(action)}_SUCCESS`
}
function getFailType(action) {
  return `${identifyAction(action)}_FAILURE`
}

let monitoredActions = []

function* monitor(monitoredAction) {
  if (monitoredActions.indexOf(monitoredAction) == -1) {
    monitoredActions.push(monitoredAction)
  } else {
    return
  }
  const { fail } = yield race({
    success: take(getSuccessType(monitoredAction)),
    fail: take(getFailType(monitoredAction))
  })

  if ( fail && fail.payload.response && fail.payload.response.status == 401 ) {
    yield put({
      type: types.REFRESH_ACCESS_TOKEN_REQUEST
    })

    const { success } = yield race({
      success: take(types.REFRESH_ACCESS_TOKEN_SUCCESS),
      fail: take(types.REFRESH_ACCESS_TOKEN_FAILURE)
    })
    if (success) {
      yield put(monitoredAction)
      const { fail } = yield race({
        success: take(getSuccessType(monitoredAction)),
        fail: take(getFailType(monitoredAction))
      })
      if (fail) {
        console.log(`requets ${monitoredAction.type} still 401 status after refreshing token`)
        yield put({ type: types.LOGOUT_USER })
      }
      monitoredActions.pop(monitoredAction) 
    } else {
      yield put({ type: types.LOGOUT_USER })
      monitoredActions.pop(monitoredAction) 
    }
  }
}

export default function*() {
  yield takeEvery(monitorableAction, monitor)
}
