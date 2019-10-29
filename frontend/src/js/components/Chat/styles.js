import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import { TextField } from '../index'

import {
  P,
  dark_bg2,
  dark_cont,
  dark_cont1
} from '../../styles'

// Containers
export const StyledTopPanel = styled.div`
  display: grid;
  grid-template-columns: auto 100px 1fr 34px;
  grid-column-gap: 5px;
`
export const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 70px 1fr 70px 70px;
`

export const StyledChatLog = styled.div`
  overflow-y: scroll;
`

// Message
export const StyledMessage = styled.div`
  background: ${dark_bg2};
  color: ${props => props.color || 'inherit'};
  padding: 10px;
  margin: 10px;
  display: grid;
  grid-template-columns: 65px 1fr 50px 50px 50px;
  border-radius: 5px;
`
export const MessageAvatar = styled.img`
  grid-column: 1;
  grid-row: 1/3;
  margin: auto 0;
  width: 60px;
  border-radius: 50%;
`

export const MessageDate = styled(P)`
  grid-column: 3/6;
  grid-row: 2;
  margin-left: auto;
  margin-top: auto;
`
export const MessageText = styled.div`
  grid-column: 2;
  grid-row: 2;
  padding-bottom: 10px;
`
// input
export const MainInput = styled.textarea`
  max-width: 330px;
  max-height: 50px;
  margin: auto 0;
  font-size: 18px;
  padding: 4px;
  background: inherit;
  color: inherit;
  resize: none;
`

export const EditMessageInput = withStyles({
  root: {
    '&': {
      width: '100%',
      color: dark_cont
    },
    '& label.Mui-focused': {
      color: dark_cont,
    },
    '& .MuiInputBase-root': {
      '&': {
        width: 'inherit',
        height: 'inherit',
        color: 'inherit'
      },
      '&::before' : {
        borderColor: dark_cont1,
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
