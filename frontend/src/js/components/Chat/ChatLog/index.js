import React from 'react'
import PropTypes from 'prop-types'

import Message from '../Message'
import { Spinner } from '../../index'
import { StyledChatLog } from '../styles'

const ChatLog = ({dialogData, deleteMessage, updateMessage}) => {
  return (
    <StyledChatLog>
      {
        dialogData
        ? dialogData.messages.length > 0
          ? dialogData.messages.map(message =>
            <Message
              key={message.id}
              message={message}
              deleteMessage={deleteMessage}
              updateMessage={updateMessage}
            />
          ) : <p>No messages yet...</p>
        : <Spinner />
      }
    </StyledChatLog>
  )
}

ChatLog.propTypes = {
  dialogData: PropTypes.object,
  deleteMessage: PropTypes.func.isRequired,
  updateMessage: PropTypes.func.isRequired,
}

export default ChatLog
