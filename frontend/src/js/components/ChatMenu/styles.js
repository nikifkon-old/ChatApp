import styled from 'styled-components'

import { dark_bg1, dark_bg2 } from '../../styles'

const StyledChatMenu = styled.section`
  flex: 0.15
  color: #fff
  background: ${dark_bg2}
  display: flex
  flex-direction: column
  align-items: center
  padding: 0 10px
  box-shadow: inset -10px 0px 20px ${dark_bg1}
`

export {
  StyledChatMenu
}
