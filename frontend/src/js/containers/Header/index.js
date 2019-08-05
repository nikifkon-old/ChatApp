import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Header as Header_component } from '../../components'

export class Header extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired
  }

  render() {
    const { isOpen } = this.props
    return (
      <Header_component isOpen={isOpen} />
    )
  }
}

const mapStateToProps = state => ({
  isOpen: state.ui.header.isOpen
})

export default connect(mapStateToProps, null)(Header)