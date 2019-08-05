import React from 'react'
import PropTypes from 'prop-types'

import { StyledLine } from './styles'

const ColoredLine = ({color}) => {
    return (
      <StyledLine color={color} />
    )
}

ColoredLine.propTypes = {
  color: PropTypes.string
}

ColoredLine.defaultProps = {
  color: "#ccc"
}

export default ColoredLine