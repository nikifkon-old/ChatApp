import styled from 'styled-components'

const StyledInfoPanel = styled.aside`
  color: ${props => props.theme.color.text.primary};
  background: ${props => props.theme.color.background.secondary};
  display: flex;
  flex-direction: column;
`

export {
  StyledInfoPanel,
}
