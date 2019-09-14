import { all } from 'redux-saga/effects'
import watchGetUserData from './ChatApp/getUserData'
import watchLoginJWT from './Authorization/loginJWT'
import watchSingUp from './Authorization/singUp'
import watchRefreshJWTToken from './Authorization/refreshJWTToken'
import monitorAuth from './Authorization/monitorAuth'
import getDialogsData from './ChatApp/getDialogsData'
import getMessagesInDialogs from './ChatApp/getMessagesInDialogs'

export default function* rootSaga() {
  yield all([
    watchGetUserData(),
    getDialogsData(),
    getMessagesInDialogs(),
    watchLoginJWT(),
    watchSingUp(),
    watchRefreshJWTToken(),
    monitorAuth(),
  ])
}
