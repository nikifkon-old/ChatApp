import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'redux-starter-kit'
import PropTypes from 'prop-types';

import { actions } from '../Auth/Auth.redux'
import { Btn, AppContainer } from '../../styles'
import { Notification } from '../../components'

export class ChatApp extends Component{

  static propTypes = {
    isAuth: PropTypes.bool,
    name: PropTypes.string,
    location: PropTypes.shape({
      state: PropTypes.shape({
        notification: PropTypes.shape({
          message: PropTypes.string
        })
      })
    }).isRequired,
    LogoutUser: PropTypes.func,
  }
  
  logout = () => {
    this.props.LogoutUser()
  }

  render() {
    const { name, location } = this.props 
    return (
      <Fragment>
        { location.state && location.state.notification ? 
          <Notification message={location.state.notification.message} type="error" />
          : null
        }
        <AppContainer>
          <h1>Hello, {name}</h1>
          <Btn onClick={this.logout}>Logout</Btn>
        </AppContainer>
      </Fragment>
      
    )
  }
}

const AuthenticatedSelector = createSelector(
  ['auth.isAuth']
)
const NameSelector = createSelector(
  ['login.user.name']
)

const mapStateToProps = state => ({
  isAuth: AuthenticatedSelector(state),
  name: NameSelector(state)
})

export default connect(mapStateToProps, actions)(ChatApp)