import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'redux-starter-kit'
import PropTypes from 'prop-types';

import { actions } from '../Auth/Auth.redux'
import { Btn } from '../../styles'
import { Notification } from '../../components'

export class ChatApp extends Component{

  static propTypes = {
    isAuth: PropTypes.bool,
    name: PropTypes.string,
    location: PropTypes.shape({
      state: PropTypes.string
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
        { location.state ? 
              <Notification message={location.state} type="error" />
              : null
        }

        <h1>Hello, {name}</h1>
        <Btn onClick={this.logout}>Logout</Btn>
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