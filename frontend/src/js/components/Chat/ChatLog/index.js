import React from 'react'
import PropTypes from 'prop-types'

import Message from '../Message'
import { StyledChatLog } from '../styles'

const ChatLog = ({dialogData}) => {
  return (
    <StyledChatLog>
      {
        dialogData
        ? dialogData.messages.length
          ? dialogData.messages.map(message =>
            <Message key={message.id} message={message} />
          ) : <p>No messages yet...</p>
        : <p>Loading...</p>
      }
    </StyledChatLog>
  )
}

ChatLog.propTypes = {
  dialogData: PropTypes.object,
}

export default ChatLog