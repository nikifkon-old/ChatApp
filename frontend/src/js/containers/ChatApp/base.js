import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  getTokens,
  getWebsocketIsAuth,
  getUserId,
  getDialogs,
} from '../../reducers/selectors'
import {
  connectToWebSocket,
  createDialog,
  getDialogData,
} from '../../actions/chatActions'
import {
  InfoPanel,
  Chat,
  RoomCreating,
} from '../../components'
import { StyledChatWrap } from '../../styles'

function ChatBase(props) {
  const {
    content,
    params,
    user_id,
    isAuth,
    fetchedSucces,
    connectToWebSocket,
    tokens,
    createDialog,
    getDialogData,
    websocketIsAuth,
  } = props

  React.useEffect(() => {
    switch (content) {
      case "chatRoom":
        if (isAuth && tokens && !websocketIsAuth) {
          connectToWebSocket()
        }
        if (websocketIsAuth && user_id && !fetchedSucces) {
          getDialogData({
            id: user_id,
            filter: params
          })
        }
        break;
    }
  }, [content, params, websocketIsAuth])

  return (
    <Fragment>
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
      <InfoPanel />
    </Fragment>
  )
}

ChatBase.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  user_id: PropTypes.number,
  websocketIsAuth: PropTypes.bool.isRequired,
  fetchedSucces: PropTypes.bool.isRequired,
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
    fetchedSucces: getDialogs(state).success,
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
