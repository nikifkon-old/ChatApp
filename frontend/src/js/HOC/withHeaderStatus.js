import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  getHeaderStatus
} from '../reducers/selectors'
import {
  handleAppHeader
} from '../actions/chatActions'

export default (ComposedComponent) => {
  class withHeaderStatus extends Component {
    static propTypes = {
      headerIsOpen: PropTypes.bool.isRequired,
    };

    render () {
      return <ComposedComponent {...this.props} />
    }
  }
  return connect(mapStateToProps, {handleAppHeader})(withHeaderStatus)
}

const mapStateToProps = state => ({
  headerIsOpen: getHeaderStatus(state)
})
