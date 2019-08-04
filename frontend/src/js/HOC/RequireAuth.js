import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

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
        history.push('/login', `You must be logged in to see the ${location.pathname} page`)
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuth) {
        this.props.history.push('/login', `You must be logged in to see the ${location.pathname} page`)
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