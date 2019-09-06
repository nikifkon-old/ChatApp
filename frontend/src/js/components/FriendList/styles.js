import styled from 'styled-components'

import { dark_bg1, dark_bg2 } from '../../styles'

const StyledFriendList = styled.section`
  flex: 0.4
  color: #fff
  background: ${dark_bg2}
  box-shadow: inset -10px 0px 20px ${dark_bg1}
  display: flex
  flex-direction: column
  align-items: center
`

export {
  StyledFriendList
}