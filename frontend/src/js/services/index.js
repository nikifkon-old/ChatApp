import axios from 'axios'
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

// axios configuration
axios.interceptors.request.use(config => {
  config.headers = getAuthHeaders()
  return config
})
axios.defaults.baseURL = 'http://' + BASE_URL

export {
  BASE_URL as default,

  loginUserService,
  singUpUserService,
  refreshTokenService,
  getAuthHeaders,

  getUserDataService,
  updateUserDataService,

  connectToWebSocketService,
  sendToWebsokcet,
}
