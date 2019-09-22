import React from 'react'
import PropTypes from 'prop-types'

import { withHeaderStatus, withDialogData } from '../../HOC'
import TopPanel from './TopPanel'
import InputPanel from './InputPanel'
import ChatLog from './ChatLog'
import { DialogSocket } from './Websockets'
import { StyledChatWrap, StyledChat } from './styles'

const Chat = (props) => {
  const {
    headerStatus,
    activeDialog,
    sendMessage,
    insertNewMessage,
    accessToken
  } = props
  return (
    <StyledChatWrap>
    <StyledChat
      headerStatus={headerStatus}
    >
      <TopPanel />
      <ChatLog dialogData={activeDialog} />
      <InputPanel sendMessage={sendMessage} />
      {
        activeDialog && activeDialog.id &&
        <DialogSocket
          url={`ws://localhost:8000/ws/dialog/${activeDialog.id}`}
          insertNewMessage={insertNewMessage}
          accessToken={accessToken}
        />
      }
    </StyledChat>
    </StyledChatWrap>
  )
}

Chat.propTypes = {
  headerStatus: PropTypes.bool.isRequired,
  sendMessage: PropTypes.func.isRequired,
  insertNewMessage: PropTypes.func.isRequired,
  accessToken: PropTypes.string,
  activeDialog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    last_message: PropTypes.object.isRequired,
    interlocutor: PropTypes.object.isRequired,
    messages: PropTypes.array,
  })
}

export default withDialogData(withHeaderStatus(Chat))
