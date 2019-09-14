import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export default (ComposedComponent) => {
  class withHeaderStatus extends Component {
    static propTypes = {
      headerStatus: PropTypes.bool.isRequired,
    };

    render () {
      return <ComposedComponent {...this.props} />
    }
  }
  return connect(mapStateToProps, null)(withHeaderStatus)
}

const mapStateToProps = state => ({
  headerStatus: state.app.header.isOpen
})
