import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  getTokens,
  getWebsocketIsAuth,
  getQueryParams,
} from '../../reducers/selectors'
import {
  dialogSelectors,
} from '../../selectors'
import {
  connectToWebSocket,
  getDialogData,
  getDialogDetails,
} from '../../actions/chatActions'

const { getActiveDialog, getDialog } = dialogSelectors

export default function useWebsocket() {
  const dispatch = useDispatch()
  const tokens = useSelector(state => getTokens(state))
  const websocketIsAuth = useSelector(state => getWebsocketIsAuth(state))
  const queryParams = useSelector(state => getQueryParams(state))

  // after get tokens connect to webo
  useEffect(() => {
    if (tokens && !websocketIsAuth) {
      dispatch(connectToWebSocket())
    }
  }, [dispatch, tokens, websocketIsAuth])

  // after authenticate get dialogs list
  useEffect(() => {
    if (websocketIsAuth) {
      const filter = new URLSearchParams(queryParams).get('filter')
      dispatch(getDialogData({
        filter: filter
      }))
    }
  }, [websocketIsAuth, dispatch, queryParams])

  // get dialogs details on active dialog change
  const active = useSelector(state => getActiveDialog(state));
  const activeDialog = useSelector(state => getDialog(state, active))
  const hasMessages = dialog =>
    dialog && dialog.messages && dialog.messages.length === 0 ? false : true

  useEffect(() => {
    if (active !== null && !hasMessages(activeDialog) && !activeDialog.fetched) {
      dispatch(getDialogDetails(active))
    }
  }, [active, activeDialog, dispatch])
}
