import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  getIsSuccessDialogs,
  getTokens,
  getActiveTab,
} from '../../reducers/selectors'
import {
  getUserProfile,
} from '../../actions/authActions'
import {
  handleAppHeader,
  getDialogs,
  connectToWebSocket,
  createDialog,
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
    getDialogs,
    isAuth,
    fetchedSuccess,
    connectToWebSocket,
    tokens,
    dialogs,
    createDialog,
    params,
  } = props

  React.useEffect(() => {
    switch (content) {
      case "chatRoom":
        if (!fetchedSuccess && isAuth) {
          getDialogs()
        }
        if (isAuth && tokens) {
          connectToWebSocket()
        }
        break;
    }
  }, [content])

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
  dialogs: PropTypes.array,
  tab: PropTypes.number.isRequired,
  fetchedSuccess: PropTypes.bool.isRequired,
  tokens: PropTypes.object,
  getUserProfile: PropTypes.func.isRequired,
  getDialogs: PropTypes.func.isRequired,
  handleAppHeader: PropTypes.func.isRequired,
  connectToWebSocket: PropTypes.func.isRequired,
  createDialog: PropTypes.func.isRequired,
  content: PropTypes.oneOf(['chatRoom', 'form']),
  params: PropTypes.oneOf(['unread', 'important']),
}

const mapStateToProps = state => {
  return {
    dialogs: state.app.dialogs.data,
    fetchedSuccess: getIsSuccessDialogs(state),
    tokens: getTokens(state),
    tab: getActiveTab(state),
  }
}

export default connect(
  mapStateToProps,
  {
    getUserProfile,
    handleAppHeader,
    getDialogs,
    connectToWebSocket,
    createDialog,
  }
)(ChatBase)
