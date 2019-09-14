import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  logoutUser,
} from '../actions/authActions'

export default (ComposedComponent) => {
  class withAccountInfo extends Component {
    static propTypes = {
      username: PropTypes.string,
      logoutUser: PropTypes.func.isRequired,
    };

    render () {
      return <ComposedComponent {...this.props} />
    }
  }
  return connect(mapStateToProps, { logoutUser })(withAccountInfo)
}

const mapStateToProps = state => ({
  username: state.auth.user.data.user,
})
