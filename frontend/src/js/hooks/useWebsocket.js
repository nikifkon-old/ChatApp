import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  getTokens,
  getWebsocketIsAuth,
  getQueryParams,
} from '../reducers/selectors'
import {
  connectToWebSocket,
  getDialogData,
} from '../actions/chatActions'

export default function useWebsocket() {
  const dispatch = useDispatch()
  const tokens = useSelector(state => getTokens(state))
  const websocketIsAuth = useSelector(state => getWebsocketIsAuth(state))
  const queryParams = useSelector(state => getQueryParams(state))
  const query = new URLSearchParams(queryParams)

  // after get tokens connect to webo
  useEffect(() => {
    if (tokens && !websocketIsAuth) {
      dispatch(connectToWebSocket())
    }
  }, [dispatch, tokens, websocketIsAuth])

  // after authenticate get dialogs list
  useEffect(() => {
    if (websocketIsAuth) {
      dispatch(getDialogData({
        filter: query.get('filter')
      }))
    }
  }, [websocketIsAuth, dispatch, query])
}
