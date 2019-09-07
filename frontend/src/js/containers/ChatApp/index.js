import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import {
  getUserProfile,
  logoutUser,
} from '../../actions/authActions'
import {
  handleAppHeader,
} from '../../actions/chatActions'

import { AppContainer } from '../../styles'
import {
  InfoPanel,
  ChatNav,
  ChatMenu,
  // FriendList,
} from '../../components'

import { FriendList } from '..'

export class ChatApp extends Component {
  static propTypes = {
    isAuth: PropTypes.bool.isRequired,
    username: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    getUserProfile: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    handleAppHeader: PropTypes.func.isRequired,
  }

  render() {
    const {
      isOpen,
      username,
      activeTab,
      logoutUser,
      getUserProfile,
      handleAppHeader,
    } = this.props

    return (
      <Fragment>
        {/* location.state && location.state.notification ?
          <Notification message={location.state.notification.message} type="error" />
          : null
        */}
        <AppContainer menuisopen={isOpen}>
          <ChatNav HandleHeader={handleAppHeader} />
          <ChatMenu />
          {/*
            <FriendList dialogs={dialogs} />
          */}
          <div>
            <button onClick={() => getUserProfile()}>get user data</button>
          </div>
          <div style={{flex: ".59"}}></div>
          <InfoPanel
           username={username}
           logout={logoutUser}
          />
        </AppContainer>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    isOpen: state.app.header.isOpen,
    username: state.auth.user.data.user,
  }
}

export default connect(
  mapStateToProps,
  {
    getUserProfile,
    logoutUser,
    handleAppHeader,
  }
)(ChatApp)
