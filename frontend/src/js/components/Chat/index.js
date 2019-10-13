import React from 'react'
import PropTypes from 'prop-types'

import { withHeaderStatus, withDialogData } from '../../HOC'
import TopPanel from './TopPanel'
import InputPanel from './InputPanel'
import ChatLog from './ChatLog'
import { StyledChat } from './styles'

const Chat = (props) => {
  const {
    fetching,
    success,
    error,
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
    <StyledChat
      headerStatus={headerStatus}
    >
      <TopPanel />
      <ChatLog
        fetching={fetching}
        success={success}
        error={error}
        dialogData={activeDialog}
        deleteMessage={deleteMessageInDialog}
        updateMessage={updateMessageInDialog}
      />
      <InputPanel sendMessage={sendMessageInDialog} id={id}/>
    </StyledChat>
  )
}

Chat.propTypes = {
  headerStatus: PropTypes.bool.isRequired,
  sendMessageInDialog: PropTypes.func.isRequired,
  deleteMessageInDialog: PropTypes.func.isRequired,
  updateMessageInDialog: PropTypes.func.isRequired,
  activeDialog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    last_message: PropTypes.object.isRequired,
    interlocutor: PropTypes.object.isRequired,
    messages: PropTypes.array,
  }),
  fetching: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  error: PropTypes.string,
}

export default withDialogData(withHeaderStatus(Chat))
