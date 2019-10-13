import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  getTokens,
  getActiveTab,
  getWebsocketIsAuth,
  getUserId,
} from '../../reducers/selectors'
import {
  getUserProfile,
} from '../../actions/authActions'
import {
  handleAppHeader,
  connectToWebSocket,
  createDialog,
  getDialogData,
} from '../../actions/chatActions'
import {
  InfoPanel,
  FriendList,
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
    connectToWebSocket,
    tokens,
    dialogs,
    createDialog,
    getDialogData,
    websocketIsAuth,
  } = props

  React.useEffect(() => {
    switch (content) {
      case "chatRoom":
        if (isAuth && tokens) {
          connectToWebSocket()
        }
        if (websocketIsAuth && user_id) {

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
      <FriendList dialogs={dialogs} />
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
  dialogs: PropTypes.array,
  tab: PropTypes.number.isRequired,
  websocketIsAuth: PropTypes.bool.isRequired,
  tokens: PropTypes.object,
  getUserProfile: PropTypes.func.isRequired,
  handleAppHeader: PropTypes.func.isRequired,
  connectToWebSocket: PropTypes.func.isRequired,
  getDialogData: PropTypes.func.isRequired,
  createDialog: PropTypes.func.isRequired,
  content: PropTypes.oneOf(['chatRoom', 'form']),
  params: PropTypes.oneOf(['unread', 'stared']),
}

const mapStateToProps = state => {
  return {
    dialogs: state.app.dialogs.data,
    tokens: getTokens(state),
    tab: getActiveTab(state),
    websocketIsAuth: getWebsocketIsAuth(state),
    user_id: getUserId(state)
  }
}

export default connect(
  mapStateToProps,
  {
    getUserProfile,
    handleAppHeader,
    connectToWebSocket,
    createDialog,
    getDialogData,
  }
)(ChatBase)
