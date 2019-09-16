import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import TextField from '../TextField'
import {
  ContentGrid,
  H4,
  P,
  dark_bg1,
  dark_bg2,
  dark_cont,
  dark_cont1
} from '../../styles'

// Containers
export const StyledChatWrap = styled.section`
  color: #fff;
  background: ${dark_bg1};
  position: relative;
`
export const StyledTopPanel = styled(ContentGrid)`
  padding: 10px;
`
export const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 70px 1fr 70px 70px;
`

export const StyledChat = styled.div`
  height: calc(100vh ${props => props.headerStatus && '- 50px'});
  position: fixed;
  width: 550px;
  display: grid;
  grid-template-rows: 70px 1fr 70px;
  transition: .3s ease-out 0s max-height;
`

export const StyledChatLog = styled.div`
  overflow-y: scroll;
`

// Message
export const StyledMessage = styled.div`
  background: ${dark_bg2};
  padding: 10px;
  margin: 10px;
  display: grid;
  grid-template-columns: 65px 1fr 100px;
  border-radius: 5px;
`
export const MessageAvatar = styled.img`
  grid-column: 1;
  grid-row: 1/3;
  margin: auto 0;
  width: 60px;
  border-radius: 50%;
`
export const MessageSender = styled(H4)`

`
export const MessageText = styled(P)`
  grid-column: 2;
  grid-row: 2;
`
export const MessageDate = styled(P)`
  grid-column: 3;
  grid-row: 2;
  margin-left: auto;
  margin-top: auto;
`

// input
export const MainInput = withStyles({
  root: {
    '&': {
      width: '100%',
      height: '45px',
      color: dark_cont
    },
    '& label.Mui-focused': {
      color: dark_cont,
    },
    '& .MuiOutlinedInput-root': {
      '&': {
        width: 'inherit',
        height: 'inherit',
        color: 'inherit'
      },
      '& fieldset': {
        borderColor: dark_cont1,
      },
      '&:hover fieldset': {
        borderColor: dark_cont,
      },
      '&.Mui-focused fieldset': {
        borderColor: dark_cont,
      },
    },
  },
})(TextField)
