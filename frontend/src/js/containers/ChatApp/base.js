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
  Nav,
  Menu,
  FriendList,
  Chat,
  RoomCreating,
} from '../../components'
import { AppContainer, StyledChatWrap } from '../../styles'

class ChatBase extends React.Component {
  static propTypes = {
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
    content: PropTypes.oneOf(['chatRoom', 'form'])
  }

  componentDidMount() {
    const { getDialogs, isAuth, fetchedSuccess, connectToWebSocket, tokens } = this.props
    if (!fetchedSuccess && isAuth) {
      getDialogs()
    }
    if (isAuth && tokens) {
      connectToWebSocket()
    }
  }

  componentDidUpdate() {
    const { getDialogs, isAuth, fetchedSuccess } = this.props
    if (!fetchedSuccess && isAuth) {
      getDialogs()
    }
  }

  render() {
    const {
      dialogs,
      createDialog,
      content
    } = this.props
    return (
      <Fragment>
        <FriendList dialogs={dialogs} />
        <StyledChatWrap>
          {
            {
              "chatRoom": (
                <Chat />
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
