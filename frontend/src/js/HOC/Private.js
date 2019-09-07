import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import PropTypes from 'prop-types'

import { getUserProfile } from '../actions/authActions'

export default function (ComposedComponent) {
  class Private extends Component {

    static propTypes = {
      isAuth: PropTypes.bool.isRequired,
      push: PropTypes.func.isRequired,
      current_url: PropTypes.string.isRequired,
      getUserProfile: PropTypes.func.isRequired,
    }

    getRedirectMessage = () => {
      const { current_url } = this.props
      return {
        redirect: {
          message: `You must be logged in to see the ${current_url} page`
        }
      }
    }

    componentDidMount(){
      const { isAuth, push, getUserProfile } = this.props
      if(!isAuth) {
        push('/login', this.getRedirectMessage())
      } else {
        getUserProfile()
      }
    }

    componentDidUpdate() {
      const { isAuth, push } = this.props
      if(!isAuth) {
        push('/login', this.getRedirectMessage())
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }
  const mapStateToProps = (state) => ({
      isAuth: state.auth.auth.isAuth,
      current_url: state.router.location.pathname,
  })

  return connect(
    mapStateToProps,
    {
      push,
      getUserProfile,
    }
  )(Private)
}
