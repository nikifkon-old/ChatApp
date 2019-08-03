import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

export default function (ComposedComponent) {
  class RequireAuth extends Component {
    
    static propTypes = { 
      isAuth: PropTypes.bool.isRequired,
      history: PropTypes.object.isRequired,
    }

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