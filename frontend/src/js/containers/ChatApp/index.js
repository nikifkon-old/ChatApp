import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'redux-starter-kit'
import { actions } from '../Auth/Auth.redux'
import { Btn } from '../../styles'


export class ChatApp extends Component{
  logout = () => {
    this.props.LogoutUser()
  }

  render() {
    const { isAuth, name } = this.props 
    return (
      <Fragment>
        {isAuth ? <h1>Hello, {name}</h1>
                : <h1><a href="/login">login</a>, please</h1>
        }
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