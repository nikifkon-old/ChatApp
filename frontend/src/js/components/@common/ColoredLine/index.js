import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { ContentGrid, P } from '../../../styles'

function getHalfWidth(width, text) {
  const percentIndex = width.indexOf("%")
  const pixelIndex = width.indexOf("px")
  const textWidth = text.length * 7
  if (percentIndex !== -1) {
    return `calc(${Number(width.slice(0, percentIndex)) / 2}% - ${textWidth}px)`
  }
  else if (percentIndex !== -1) {
    return `calc(${Number(width.slice(0, pixelIndex)) / 2}px - ${textWidth}px)`
  }
}

const ColoredLine = ({color, width, height, text}) => {
  if (text) {
    const halfWidth = getHalfWidth(width, text)
    return (
      <ContentGrid
        container
        alignItems="center"
      >
        <StyledLine color={color} width={halfWidth} height={height} inline />
        <P inline>{text}</P>
        <StyledLine color={color} width={halfWidth} height={height} inline />
      </ContentGrid>
    )
  }
  return (
    <StyledLine color={color} width={width} height={height} />
  )
}

const StyledLine = styled.hr`
  width: ${props => props.width || "100%"};
  background-color: ${props => props.color || "#000"};
  border: 0;
  height: ${props => props.height || "1px"};
  display: ${props => props.inline && 'inline-block'};
`

export {
  StyledLine
}

ColoredLine.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  text: PropTypes.string,
}

ColoredLine.defaultProps = {
  color: "#ccc",
  width: "100%",
  height: "1px",
}

export default ColoredLine
