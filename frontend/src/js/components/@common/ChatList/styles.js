import styled from 'styled-components'

import {
  Content,
  Img,
  P,
  H4,
  dark_cont,
  dark_bg2,
  dark_bg3,
  dark_active
} from '../../../styles'

export const StyledDialogList = styled.section`
  color: #fff
  background: ${dark_bg2}
  display: flex
  flex-direction: column
  align-items: center
`

export const UnreadMessagesCounter = styled(Content)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-column: 3;
    grid-row: 1;

    & > p {
      width: 20px;
      height: 20px;
      background: ${dark_active};
      border-radius: 50%;
    }
  }
`

export const Grid = styled.div`
  display: grid;
  padding: 5px;
  grid-template-columns: 60px 1fr 60px;
  grid-template-rows: auto 1fr;
  grid-column-gap: 30px;
  user-select: none;

  &:hover {
    background: ${dark_bg3};
  }
  &:active {
    background: ${dark_active}
    & > div${UnreadMessagesCounter} > p {
      background: ${dark_cont};
      color: ${dark_active};
    }
  }
`

export const AvatarItem = styled(Img)`
  grid-column: 1;
  grid-row: 1/3;
  margin: auto 0;
`

export const UsernameItem = styled(H4)`
  grid-column: 2;
  grid-row: 1;
  margin-right: auto;
`

export const LastMessageItem = styled(P)`
  grid-column: 2;
  grid-row: 2;
  margin-right: auto;
`

export const ElapsedTimeItem = styled(P)`
  grid-column: 3;
  grid-row: 2
`
