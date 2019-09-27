import {
  loginUserService,
  singUpUserService,
  refreshTokenService,
  getAuthHeaders,
} from './authServices'
import {
  getUserDataService,
} from './userDataService'
import {
  getDialogsDataService,
  getMessagesInDialogService,
} from './ChatServices/dialogsServices'
import {
  connectToWebSocketService,
  sendToWebsokcet
} from './Websocket'

let BASE_URL
if(process.env.NODE_ENV === 'development') {
  BASE_URL = 'localhost:8000'
}

if(process.env.NODE_ENV === 'production') {
  BASE_URL = 'localhost:8000'
}

export {
  BASE_URL as default,

  loginUserService,
  singUpUserService,
  refreshTokenService,
  getAuthHeaders,

  getUserDataService,

  getDialogsDataService,
  getMessagesInDialogService,

  connectToWebSocketService,
  sendToWebsokcet,
}
