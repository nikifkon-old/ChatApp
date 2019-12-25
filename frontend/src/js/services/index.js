import {
  loginUserService,
  singUpUserService,
  refreshTokenService,
  getAuthHeaders,
} from './authServices'
import {
  getUserDataService,
  updateUserDataService,
} from './userDataService'
import {
  connectToWebSocketService,
  sendToWebsokcet
} from './Websocket'

let BASE_URL
if(process.env.NODE_ENV === 'development') {
  BASE_URL = 'localhost:8000'
}

if(process.env.NODE_ENV === 'production') {
  BASE_URL = '13.58.207.223'
}

const config = {
  'headers': {
    ...getAuthHeaders()
  }
}

export {
  BASE_URL as default,
  config,

  loginUserService,
  singUpUserService,
  refreshTokenService,
  getAuthHeaders,

  getUserDataService,
  updateUserDataService,

  connectToWebSocketService,
  sendToWebsokcet,
}
