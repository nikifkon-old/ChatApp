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
  const filter = new URLSearchParams(queryParams).get('filter')

  // after get tokens connect to websocket
  useEffect(() => {
    if (tokens && !websocketIsAuth) {
      dispatch(connectToWebSocket())
    }
  }, [dispatch, tokens, websocketIsAuth])

  // after authenticate get dialogs list
  useEffect(() => {
    if (websocketIsAuth) {
      dispatch(getDialogData({
        filter: filter
      }))
    }
  }, [websocketIsAuth, dispatch, filter])

  // get dialogs details on active dialog change
  const active = useSelector(state => getActiveDialog(state));
  const activeDialog = useSelector(state => getDialog(state, active))

  useEffect(() => {
    if (activeDialog &&
      !activeDialog.fetched &&
      filter !== 'stared'
    ) {
      dispatch(getDialogDetails(active))
    }
  }, [active, activeDialog, dispatch, filter])
}
