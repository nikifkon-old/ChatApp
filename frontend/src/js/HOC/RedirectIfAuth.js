import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

export default function (ComposedComponent) {
  class RedirectIfAuth extends Component {
    static propTypes = { 
      isAuth: PropTypes.bool.isRequired,
      history: PropTypes.object.isRequired
    }

    componentWillMount() {
      const { isAuth, history } = this.props
      if (isAuth) {
        history.push('/app', 'You has already login in')
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.isAuth) {
        this.props.history.push('/app', 'You has already login in')
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