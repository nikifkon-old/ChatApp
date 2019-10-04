import React from 'react'
import PropTypes from 'prop-types'

import Message from '../Message'
import { Spinner } from '../../index'
import { StyledChatLog } from '../styles'

const ChatLog = ({dialogData, deleteMessage, updateMessage}) => {
  const scrollDiv = React.createRef()

  React.useEffect(() => {
    // always scroll to bottom
    scrollDiv.current.scrollTop = scrollDiv.current.scrollHeight
  })

  return (
    <StyledChatLog ref={scrollDiv}>
      {
        dialogData
        ? (
          typeof(dialogData.messages) === 'object' &&
          dialogData.messages.length > 0
        )
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
