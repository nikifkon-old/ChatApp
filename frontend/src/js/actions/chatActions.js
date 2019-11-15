import * as types from './index'

export const handleAppHeader = () => {
  return {
    type: types.HANDLE_APP_HEADER
  }
}

export const connectToWebSocket = () => {
  return {
    type: types.WEBSOCKET_CONNECT_REQUEST
  }
}
