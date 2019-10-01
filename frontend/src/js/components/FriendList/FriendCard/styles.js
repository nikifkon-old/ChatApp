import styled from 'styled-components'
import IconButton from '../../IconButton'
import { Img, P, H4, dark_bg3, dark_active } from '../../../styles'

const Grid = styled.div`
  display: grid;
  padding: 5px;
  grid-template-columns: 60px 1fr 60px;
  grid-template-rows: auto 1fr;
  grid-column-gap: 30px;

  &:hover {
    background: ${dark_bg3};
  }
  &:active {
    background: ${dark_active}
  }
`

const AvatarItem = styled(Img)`
  grid-column: 1;
  grid-row: 1/3;
  margin: auto 0;
`

const UsernameItem = styled(H4)`
  grid-column: 2;
  grid-row: 1;
  margin-right: auto;
`

const IconButtonItem = styled(IconButton)`
  grid-column: 3;
  grid-row: 1;
`

const LastMessageItem = styled(P)`
  grid-column: 2;
  grid-row: 2;
  margin-right: auto;
`

const ElapsedTimeItem = styled(P)`
  grid-column: 3;
  grid-row: 2
`

export {
  Grid,
  AvatarItem,
  UsernameItem,
  IconButtonItem,
  LastMessageItem,
  ElapsedTimeItem,
}
