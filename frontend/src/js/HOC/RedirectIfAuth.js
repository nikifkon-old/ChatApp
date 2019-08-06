import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const error_message = {
  notification: {
    message: 'You has already login in'
  }
}

export default function (ComposedComponent) {
  class RedirectIfAuth extends Component {
    static propTypes = { 
      isAuth: PropTypes.bool.isRequired,
      history: PropTypes.object.isRequired
    }

    componentDidMount() {
      const { isAuth, history } = this.props
      if (isAuth) {
        history.push('/app', error_message)
      }
    }

    componentDidUpdate() {
      const { isAuth, history } = this.props
      if (isAuth) {
        history.push('/app', error_message)
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }
  const mapStateToProps = (state) => ({
      isAuth: state.auth.isAuth
  })

  return connect(mapStateToProps)(RedirectIfAuth)
}