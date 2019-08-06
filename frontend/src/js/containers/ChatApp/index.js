import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'redux-starter-kit'
import PropTypes from 'prop-types';

import { actions as AuthActions } from '../Auth/Auth.redux'
import { actions as HeaderActions } from '../Header/Header.redux'

import { AppContainer } from '../../styles'
import { Notification, InfoPanel, ChatNav, ChatMenu, FriendList } from '../../components'

export class ChatApp extends Component{

  static propTypes = {
    isAuth: PropTypes.bool,
    name: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        notification: PropTypes.shape({
          message: PropTypes.string
        })
      })
    }).isRequired,
    LogoutUser: PropTypes.func,
    HandleHeader: PropTypes.func,
  }
  
  logout = () => {
    this.props.LogoutUser()
  }

  render() {
    const { name, location, isOpen, HandleHeader } = this.props
    return (
      <Fragment>
        { location.state && location.state.notification ? 
          <Notification message={location.state.notification.message} type="error" />
          : null
        }
        <AppContainer menuisopen={isOpen}>
          <ChatNav HandleHeader={HandleHeader} />
          <ChatMenu />
          <FriendList />
          <div style={{flex: ".59"}}></div>
          <InfoPanel username={name} />
        </AppContainer>
      </Fragment>
      
    )
  }
}

// const AuthenticatedSelector = createSelector(
//   ['auth.isAuth']
// )
const NameSelector = createSelector(
  ['login.user.name']
)

const mapStateToProps = state => ({
  // isAuth: AuthenticatedSelector(state),
  name: NameSelector(state),
  isOpen: state.ui.header.isOpen
})

export default connect(mapStateToProps, {...AuthActions, ...HeaderActions})(ChatApp)