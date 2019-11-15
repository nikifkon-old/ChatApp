import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  getTokens,
  getWebsocketIsAuth,
} from '../../reducers/selectors'
import {
  dialogSelectors,
  routerSelectors,
} from '../../selectors'
import {
  connectToWebSocket,
} from '../../actions/chatActions'
import {
  getDialogData,
  getDialogDetails,
} from '../../actions/dialogActions'

const { getActiveDialogId, getDialog } = dialogSelectors
const { getQueryParams } = routerSelectors

export default function useWebsocket() {
  const dispatch = useDispatch()
  const tokens = useSelector(state => getTokens(state))
  const websocketIsAuth = useSelector(state => getWebsocketIsAuth(state))
  const filter = useSelector(state => getQueryParams(state, 'filter'))

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
  const active = useSelector(state => getActiveDialogId(state));
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
