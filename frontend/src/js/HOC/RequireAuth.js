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

    componentDidMount(){
      const { isAuth, history, location } = this.props
      if (!isAuth) {
        history.push('/login', get_error_message(location.pathname))
      }
    }

    componentDidUpdate() {
      const { isAuth, history, location } = this.props
      if (!isAuth) {
        history.push('/login', get_error_message(location))
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