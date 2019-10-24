import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types';

import { setAsRead } from '../../actions/chatActions'
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

  const [maxOffset, setMaxOffset] = useState(500)

  const handleScroll = useCallback((e) => {
    const elementDom = e.target
    const new_value = elementDom.scrollTop + elementDom.offsetHeight
    if ( Math.abs(maxOffset - new_value) > 100) {
      console.log('set max offset', new_value);
      setMaxOffset(new_value)
    }
  }, [maxOffset])

  const dispatch = useDispatch()

  const handleUnread = useCallback(({dialog, id}) => {
    dispatch(setAsRead({
      dialog_id: dialog,
      message_id: id,
    }))
  }, [dispatch])

  return (
    <StyledChatLog
      onScroll={handleScroll}
      ref={ChatLog}
    >
      {
        success
          ? dialogData && dialogData.messages.length > 0
            ? dialogData.messages.map(message => {
                return (
                  <Message
                    key={message.id}
                    maxOffset={maxOffset}
                    message={message}
                    handleUnread={handleUnread}
                    deleteMessage={deleteMessage}
                    updateMessage={updateMessage}
                  />
                )
              }
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
