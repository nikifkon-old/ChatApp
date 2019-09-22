import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { getIsSuccessDialogs } from '../../reducers/selectors'
import {
  getUserProfile,
} from '../../actions/authActions'
import {
  handleAppHeader,
  getDialogs,
} from '../../actions/chatActions'
import { withHeaderStatus } from '../../HOC'
import { AppContainer } from '../../styles'
import {
  InfoPanel,
  ChatNav,
  ChatMenu,
  FriendList,
  Chat,
} from '../../components'


export class ChatApp extends Component {
  static propTypes = {
    isAuth: PropTypes.bool.isRequired,
    headerStatus: PropTypes.bool.isRequired,
    dialogs: PropTypes.array,
    fetchedSuccess: PropTypes.bool.isRequired,
    getUserProfile: PropTypes.func.isRequired,
    getDialogs: PropTypes.func.isRequired,
    handleAppHeader: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { getDialogs, isAuth, fetchedSuccess } = this.props
    if (!fetchedSuccess && isAuth) {
      getDialogs()
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
    } = this.props

    return (
      <Fragment>
        {/* location.state && location.state.notification ?
          <Notification message={location.state.notification.message} type="error" />
          : null
        */}
        <AppContainer menuisopen={headerStatus}>
          <ChatNav HandleHeader={handleAppHeader} />
          <ChatMenu />
          <FriendList dialogs={dialogs} />
          <Chat />
          <InfoPanel />
        </AppContainer>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    dialogs: state.app.dialogs.data,
    fetchedSuccess: getIsSuccessDialogs(state)
  }
}

export default connect(
  mapStateToProps,
  {
    getUserProfile,
    handleAppHeader,
    getDialogs,
  }
)(
  withHeaderStatus(ChatApp)
)
