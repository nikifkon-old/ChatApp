import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  getWebsocketIsAuth,
} from '../selectors/WebsocketSelectors'
import {
  hasTokens,
} from '../selectors/AuthSelectors'
import {
  getActiveDialog
} from '../selectors/DialogSelectors'
import {
  getQueryParams,
} from '../selectors/RouterSelectors'
import {
  connectToWebSocket,
} from '../actions/chatActions'
import {
  getDialogData,
  getDialogDetails,
} from '../actions/dialogActions'

export default function useWebsocket() {
  const dispatch = useDispatch()
  const tokensExist = useSelector(state => hasTokens(state))
  const websocketIsAuth = useSelector(state => getWebsocketIsAuth(state))
  const filter = useSelector(state => getQueryParams(state, 'filter'))

  // after get tokens connect to websocket
  useEffect(() => {
    if (tokensExist && !websocketIsAuth) {
      dispatch(connectToWebSocket())
    }
  }, [dispatch, tokensExist, websocketIsAuth])

  // after authenticate get dialogs list
  useEffect(() => {
    if (websocketIsAuth) {
      dispatch(getDialogData({
        filter: filter
      }))
    }
  }, [websocketIsAuth, dispatch, filter])

  // get dialogs details on active dialog change
  const activeDialog = useSelector(state => getActiveDialog(state))

  useEffect(() => {
    if (activeDialog &&
      !activeDialog.fetched &&
      filter !== 'stared'
    ) {
      dispatch(getDialogDetails(activeDialog.id))
    }
  }, [activeDialog, dispatch, filter])
}
