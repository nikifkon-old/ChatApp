import styled from 'styled-components'

import { dark_bg1, dark_bg2 } from '../../styles'

const StyledChatMenu = styled.section`
  color: #fff
  background: ${dark_bg2}
  display: flex
  flex-direction: column
  align-items: center
  padding: 0 10px
  box-shadow: inset -5px 0px 10px ${dark_bg1}
`

export {
  StyledChatMenu
}
