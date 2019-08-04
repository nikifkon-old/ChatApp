import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const get_error_message = url => ({
  notification: {
    message: `You must be logged in to see the ${url} page`
  }
})

export default function (ComposedComponent) {
  class RequireAuth extends Component {

    static propTypes = { 
      isAuth: PropTypes.bool.isRequired,
      history: PropTypes.shape({
        push: PropTypes.func.isRequired
      }),
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
      })
    }

    componentWillMount() {
      const { isAuth, history, location } = this.props
      if (!isAuth) {
        history.push('/login', get_error_message(location.pathname))
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuth) {
        this.props.history.push('/login', get_error_message(location.pathname))
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }
  const mapStateToProps = (state) => ({
      isAuth: state.auth.isAuth
  })

  return connect(mapStateToProps)(RequireAuth)
}