import BASE_URL from '../index'
import * as types from '../../actions'
import { store } from '../../index'

let socket
export function connectToWebSocketService() {
  return new Promise(function(resolve, reject) {
    if (socket) {
      resolve(socket)
    } else {
      socket = new WebSocket(`ws://${BASE_URL}/ws/main/`)
    }

    socket.onopen = event => {
      resolve(socket)
      console.log('%c%s', 'color: orangered;', `Connecting to ${event.target.url}`)
    }

    socket.onmessage = event => {
      const payload = JSON.parse(event.data)
      store.dispatch({
        type: types.WEBSOCKET_RECEIVE_MESSAGE,
        payload
      })
    }

    socket.onclose = event => {
      reject(event)
      socket = null
      console.log('%c%s', 'color: orangered;', `Disconnecting on ${event.target.url}`)
    }

    socket.onerror = error => {
      reject(error)
      socket = null
    }

    return socket
  })
}

export function sendToWebsokcet(data) {
  const json_data = JSON.stringify(data)
  socket.send(json_data)
  return json_data
}
