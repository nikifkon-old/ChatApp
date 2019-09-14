import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import PropTypes from 'prop-types'

import { getIsSuccessUserData } from '../reducers/selectors'
import { getUserProfile } from '../actions/authActions'

export default function (ComposedComponent) {
  class Private extends Component {

    static propTypes = {
      isAuth: PropTypes.bool.isRequired,
      fetchedSuccess: PropTypes.bool.isRequired,
      current_url: PropTypes.string.isRequired,
      push: PropTypes.func.isRequired,
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
      const { isAuth, fetchedSuccess, push, getUserProfile } = this.props
      if(!isAuth) {
        push('/login', this.getRedirectMessage())
      }
      if (!fetchedSuccess) {
        getUserProfile()
      }
    }

    componentDidUpdate() {
      const { isAuth, fetchedSuccess, push } = this.props
      if(!isAuth) {
        push('/login', this.getRedirectMessage())
      }
      if (!fetchedSuccess) {
        getUserProfile()
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }
  const mapStateToProps = (state) => ({
    isAuth: state.auth.auth.isAuth,
    current_url: state.router.location.pathname,
    fetchedSuccess: getIsSuccessUserData(state),
  })

  return connect(
    mapStateToProps,
    {
      push,
      getUserProfile,
    }
  )(Private)
}
