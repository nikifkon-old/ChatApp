import React from 'react'
import PropTypes from 'prop-types'

import { StyledLine } from './styles'

const ColoredLine = ({color, width, height}) => {
    return (
      <StyledLine color={color} width={width} height={height} />
    )
}

ColoredLine.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
}

ColoredLine.defaultProps = {
  color: "#ccc",
  width: "100%",
  height: "1px",
}

export default ColoredLine