import styled from 'styled-components'

import {
  Content,
  Img,
  P,
  H4,
} from '../../../styles'

export const StyledList = styled.section`
  color: #fff
  background: ${props => props.theme.color.background.secondary}
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
    grid-row: 2;

    &:before {
      content: "";
      position: absolute;
      height: 30px;
      width: 30px;
      background: #2B5278;
      border-radius: 50%;
      z-index: 1;
    }
    & > p {
      z-index: 2;
    }
  }
`

export const CardGrid = styled.div`
  display: grid;
  height: 80px;
  grid-template-columns: 80px 1fr 60px;
  grid-template-rows: calc(16px*3) calc(16px*2);
  user-select: none;

  &:hover {
    background: ${props => props.theme.color.background.light};
  }
  &:active {
    background: ${props => props.theme.color.primary}
    & > div${UnreadMessagesCounter} > p {
      color: #000;
    }
    & > div${UnreadMessagesCounter}:before {
      background: ${props => props.theme.color.background.light};
    }
  }
`

export const AvatarItem = styled(Img)`
  grid-column: 1;
  grid-row: 1/3;
  margin: 10px;
`

export const UsernameItem = styled(H4)`
  grid-column: 2;
  grid-row: 1;
  margin-right: auto;
`

export const LastMessageItem = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  grid-column: 2;
  grid-row: 2;
`

export const ElapsedTimeItem = styled(P)`
  grid-column: 3;
  grid-row: 1;
`
