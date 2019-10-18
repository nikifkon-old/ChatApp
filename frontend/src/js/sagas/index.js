import { all } from 'redux-saga/effects'
import watchGetUserData from './ChatApp/getUserData'
import watchLoginJWT from './Authorization/loginJWT'
import watchSingUp from './Authorization/singUp'
import watchRefreshJWTToken from './Authorization/refreshJWTToken'
import monitorAuth from './Authorization/monitorAuth'
import logoutCleanUp from './Authorization/logoutCleanUp'
import getMessagesInDialogs from './ChatApp/getMessagesInDialogs'
import connectToWebSocket from './Websocket/connectToWebSocket'
import sendToWebsocket from './Websocket/sendToWebsocket'
import messageReducer from './Websocket/messageReducer'

export default function* rootSaga() {
  yield all([
    watchGetUserData(),
    getMessagesInDialogs(),
    watchLoginJWT(),
    watchSingUp(),
    watchRefreshJWTToken(),
    monitorAuth(),
    logoutCleanUp(),
    connectToWebSocket(),
    sendToWebsocket(),
    messageReducer(),
  ])
}
