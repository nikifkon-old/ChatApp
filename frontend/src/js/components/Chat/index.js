import React from 'react'
import PropTypes from 'prop-types'

import { withHeaderStatus, withDialogData } from '../../HOC'
import TopPanel from './TopPanel'
import InputPanel from './InputPanel'
import ChatLog from './ChatLog'
import { StyledChatWrap, StyledChat } from './styles'

const Chat = (props) => {
  const {
    headerStatus,
    activeDialog,
    sendMessageInDialog,
    deleteMessageInDialog,
    updateMessageInDialog,
  } = props
  let id
  if (activeDialog) {
    id = activeDialog.id
  }
  return (
    <StyledChatWrap>
    <StyledChat
      headerStatus={headerStatus}
    >
      <TopPanel />
      <ChatLog
        dialogData={activeDialog}
        deleteMessage={deleteMessageInDialog}
        updateMessage={updateMessageInDialog}
      />
      <InputPanel sendMessage={sendMessageInDialog} id={id}/>
    </StyledChat>
    </StyledChatWrap>
  )
}

Chat.propTypes = {
  headerStatus: PropTypes.bool.isRequired,
  sendMessageInDialog: PropTypes.func.isRequired,
  deleteMessageInDialog: PropTypes.func.isRequired,
  updateMessageInDialog: PropTypes.func.isRequired,
  accessToken: PropTypes.string,
  activeDialog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    last_message: PropTypes.object.isRequired,
    interlocutor: PropTypes.object.isRequired,
    messages: PropTypes.array,
  })
}

export default withDialogData(withHeaderStatus(Chat))
