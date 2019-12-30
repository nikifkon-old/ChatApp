import styled from 'styled-components'

const StyledChatMenu = styled.section`
  color: #fff
  background: ${props => props.theme.color.background.secondary}
  display: flex
  flex-direction: column
  align-items: center
  padding: 0 10px
  box-shadow: inset -5px 0px 10px ${props => props.theme.color.background.primary}
`

export {
  StyledChatMenu
}
