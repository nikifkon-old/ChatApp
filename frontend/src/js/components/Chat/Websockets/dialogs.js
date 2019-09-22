import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

let WS

const DialogSocket = ({url, insertNewMessage, accessToken}) => {
  useEffect(() => {
    if (WS) {
      WS.close()
    }
    WS = new WebSocket(url)
    WS.onmessage = onMessage
    WS.onopen = onOpen
    WS.onclose = onClose
  }, [url])

  const onOpen = e => {
    console.log('%c%s', 'color: orangered;', `Connecting to ${e.target.url}`)
    authenticate()
  }

  const onClose = e => {
    console.log('%c%s', 'color: orangered;', `Disconnecting on ${e.target.url}`)
  }

  const authenticate = () => {
    sendMessage({
      event: 'authenticate',
      data: {
        access_token: accessToken
      }
    })
  }

  const onMessage = e => {
    const message = JSON.parse(e.data)
    console.log(e.data)
    switch (message.event) {

      case 'authenticate':
      if(message.status === 'ok') {
        console.log('%c%s',
          'color: green;',
          message.data.detail
        );
      } else {
        console.log('%c%s %s', 'color: red;','error', message.data.detail);
      }
      break

      case 'message':
        insertNewMessage(message.data)
        console.log('%c%s', 'color: green;', 'receive message');
        break

      case 'send.message':
        if(message.status === 'ok') {
          console.log('%c%s %s',
            'color: green;',
            'successed send message',
            message.data
          );
        } else {
          console.log('%c%s %s', 'color: red;','error', message.data.detail);
        }
        break

      default:
        console.log('Undefinded event')
    }
  }

  return (
    <div />
  )
}

export const sendMessage = data => {
  WS.send(JSON.stringify(data))
}

DialogSocket.propTypes = {
  url: PropTypes.string.isRequired,
  insertNewMessage: PropTypes.func.isRequired,
  accessToken: PropTypes.string,
}

export default DialogSocket
