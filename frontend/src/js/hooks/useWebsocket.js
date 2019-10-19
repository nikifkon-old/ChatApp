import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  getTokens,
  getWebsocketIsAuth,
} from '../reducers/selectors'
import {
  connectToWebSocket,
  getDialogData,
} from '../actions/chatActions'

export default function useWebsocket() {
  const dispatch = useDispatch()
  const tokens = useSelector(state => getTokens(state))
  const websocketIsAuth = useSelector(state => getWebsocketIsAuth(state))

  // useWebsocket(isAuth, tokens, websocketIsAuth)
  useEffect(() => {
    if (tokens && !websocketIsAuth) {
      dispatch(connectToWebSocket())
    }
  }, [dispatch, tokens, websocketIsAuth])

  // after authenticate get dialogs list
  useEffect(() => {
    if (websocketIsAuth) {
      dispatch(getDialogData({}))
    }
  }, [websocketIsAuth, dispatch])
}
