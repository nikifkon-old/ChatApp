import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class RequireAuth extends Component {
    componentWillMount() {
      const { isAuth, history } = this.props
      if (!isAuth) {
        history.push('/login')
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuth) {
        this.props.history.push('/login')
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