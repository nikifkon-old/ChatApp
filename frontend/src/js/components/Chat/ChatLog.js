import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import Message from './Message'
import { Spinner } from '../index'
import { StyledChatLog } from './styles'
import { P } from '../../styles'

function ChatLog(props) {
  const {
    dialogData,
    deleteMessage,
    updateMessage,
    success,
    error,
  } = props
  const ChatLog = React.createRef()

  // useEffect(() => {
  //   // always scroll to bottom
  //   ChatLog.current.scrollTop = ChatLog.current.scrollHeight
  // })

  // scroll handle
  const [maxOffset, setMaxOffset] = useState(0)

  const handleScroll = useCallback((e) => {
    const elementDom = e.target
    const new_value = elementDom.scrollTop + elementDom.offsetHeight
    if ( Math.abs(maxOffset - new_value) > 100) {
      setMaxOffset(elementDom.scrollTop + elementDom.offsetHeight)
    }
  }, [maxOffset])

  useEffect(() => {
    const elementDom = ChatLog.current
    elementDom.addEventListener('scroll', handleScroll)
    return () => {
      elementDom.removeEventListener('scroll', handleScroll)
    }
  }, [ChatLog, handleScroll])

  return (
    <StyledChatLog
      ref={ChatLog}
    >
      {
        success
          ? dialogData && dialogData.messages.length > 0
            ? dialogData.messages.map(message =>
              <Message
                key={message.id}
                maxOffset={maxOffset}
                message={message}
                deleteMessage={deleteMessage}
                updateMessage={updateMessage}
              />
            )
            : <P center>No messages yet...</P>
          : error
            ? <P center>Error</P>
            : <Spinner />
      }
    </StyledChatLog>
  );
}

ChatLog.propTypes = {
  dialogData: PropTypes.object,
  deleteMessage: PropTypes.func.isRequired,
  updateMessage: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default ChatLog;
