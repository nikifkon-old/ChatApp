import React, { Component, Fragment } from 'react'
import {
  Route,
  Switch,
} from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

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
import { withHeaderStatus } from '../../HOC'
import { AppContainer, StyledChatWrap } from '../../styles'
import {
  InfoPanel,
  Nav,
  Menu,
  FriendList,
  Chat,
  RoomCreating,
} from '../../components'


export class ChatApp extends Component {
  static propTypes = {
    isAuth: PropTypes.bool.isRequired,
    headerStatus: PropTypes.bool.isRequired,
    dialogs: PropTypes.array,
    tab: PropTypes.number.isRequired,
    fetchedSuccess: PropTypes.bool.isRequired,
    tokens: PropTypes.object,
    getUserProfile: PropTypes.func.isRequired,
    getDialogs: PropTypes.func.isRequired,
    handleAppHeader: PropTypes.func.isRequired,
    connectToWebSocket: PropTypes.func.isRequired,
    createDialog: PropTypes.func.isRequired,
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
      headerStatus,
      dialogs,
      handleAppHeader,
      tab,
      createDialog,
    } = this.props

    return (
      <Fragment>
        <FriendList dialogs={dialogs} />
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
)(
  withHeaderStatus(ChatApp)
)
