import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import PropTypes from 'prop-types'


export default function (ComposedComponent) {
  class AuthRouter extends Component {

    static propTypes = {
      isAuth: PropTypes.bool.isRequired,
      push: PropTypes.func.isRequired,
    }

    getRedirectMessage = () => {
      return {
        redirect: {
          message: 'You has already login in'
        }
      }
    }

    componentDidMount(){
      const { isAuth, push } = this.props
      if(isAuth) {
        push('/app', this.getRedirectMessage())
      }
    }

    componentDidUpdate() {
      const { isAuth, push } = this.props
      if(isAuth) {
        push('/app', this.getRedirectMessage())
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }
  const mapStateToProps = (state) => ({
      isAuth: state.auth.auth.isAuth,
  })

  return connect(
    mapStateToProps,
    { push }
  )(AuthRouter)
}
