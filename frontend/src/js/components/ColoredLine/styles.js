import styled from 'styled-components'

const StyledLine = styled.hr`
  width: ${props => props.width || "100%"}
  background-color: ${props => props.color || "#000"}
  border: 0
  height: ${props => props.height || "1px"}
`

export {
  StyledLine
}