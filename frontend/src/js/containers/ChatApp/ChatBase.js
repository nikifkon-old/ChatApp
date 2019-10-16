import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  getTokens,
  getWebsocketIsAuth,
  getUserId,
} from '../../reducers/selectors'
import {
  connectToWebSocket,
  createDialog,
  getDialogData,
} from '../../actions/chatActions'
import {
  RoomCreating,
} from '../../components'
import {
  Chat,
} from '../index'
import { StyledChatWrap } from '../../styles'

function ChatBase(props) {
  const {
    content,
    params,
    user_id,
    isAuth,
    connectToWebSocket,
    tokens,
    createDialog,
    getDialogData,
    websocketIsAuth,
  } = props

  useEffect(() => {
    if (isAuth && tokens && !websocketIsAuth) {
      connectToWebSocket()
    }
  }, [connectToWebSocket, isAuth, tokens, websocketIsAuth])

  useEffect(() => {
    if (websocketIsAuth) {
      getDialogData({
        id: user_id,
        filter: params
      })
    }
  }, [websocketIsAuth, params, getDialogData, user_id])

  return (
    <StyledChatWrap>
      {
        {
          "chatRoom": (
            <Chat params={params} />
          ),
          "form": (
            <RoomCreating createDialog={createDialog} />
          )
        }[content]
      }
    </StyledChatWrap>
  )
}

ChatBase.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  user_id: PropTypes.number,
  websocketIsAuth: PropTypes.bool.isRequired,
  tokens: PropTypes.object,
  connectToWebSocket: PropTypes.func.isRequired,
  getDialogData: PropTypes.func.isRequired,
  createDialog: PropTypes.func.isRequired,
  content: PropTypes.oneOf(['chatRoom', 'form']),
  params: PropTypes.oneOf(['unread', 'stared']),
}

const mapStateToProps = state => {
  return {
    tokens: getTokens(state),
    websocketIsAuth: getWebsocketIsAuth(state),
    user_id: getUserId(state),
  }
}

export default connect(
  mapStateToProps,
  {
    connectToWebSocket,
    createDialog,
    getDialogData,
  }
)(ChatBase)
