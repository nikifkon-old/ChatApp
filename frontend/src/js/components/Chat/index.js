import React from 'react'
import PropTypes from 'prop-types'

import { withHeaderStatus, withDialogData } from '../../HOC'
import TopPanel from './TopPanel'
import InputPanel from './InputPanel'
import ChatLog from './ChatLog'
import { StyledChatWrap, StyledChat } from './styles'

const Chat = ({headerStatus, activeDialog}) => {
  return (
    <StyledChatWrap>
    <StyledChat
      headerStatus={headerStatus}
    >
      <TopPanel />
      <ChatLog dialogData={activeDialog} />
      <InputPanel />
    </StyledChat>
    </StyledChatWrap>
  )
}

Chat.propTypes = {
  headerStatus: PropTypes.bool.isRequired,
  activeDialog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    last_message: PropTypes.object.isRequired,
    interlocutor: PropTypes.object.isRequired,
    messages: PropTypes.array,
  })
}

export default withDialogData(withHeaderStatus(Chat))
