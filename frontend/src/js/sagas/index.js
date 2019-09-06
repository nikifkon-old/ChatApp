import { all } from 'redux-saga/effects'
import watchGetUserData from './getUserData'
import watchLoginJWT from './loginJWT'
import watchSingUp from './singUp'
import watchRefreshJWTToken from './refreshJWTToken'
import monitorAuth from './monitorAuth'

export default function* rootSaga() {
  yield all([
    watchGetUserData(),
    watchLoginJWT(),
    watchSingUp(),
    watchRefreshJWTToken(),
    monitorAuth(),
  ])
}
