import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { PageContainer as StyledPageContainer } from '../../styles'

export class PageContainer extends Component {
  render() {
    const { children, isOpen } = this.props
    return (
      <StyledPageContainer
        menuisopen={isOpen}
        container 
        direction="column"
        background="#edeef0"
      >
        {children}
      </StyledPageContainer>
    )
  }
}


PageContainer.propTypes = {
  children: PropTypes.element.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isOpen: state.ui.header.isOpen,
})

export default connect(mapStateToProps, {})(PageContainer)