import React, { Fragment, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Message,
  NewMessagesLabel,
} from './index'
import { Spinner } from '../../../index'
import { StyledChatLog } from '../styles'
import { P } from '../../../../styles'


function ChatLog(props) {
  const {
    data,
    success,
    error,
    firstUnread,
    messageProps,
  } = props
  const ChatLog = React.createRef()

  const [maxOffset, setMaxOffset] = useState(null)

  // set initial value to maxOffset
  useEffect(() => {
    const elementDom = ChatLog.current
    if(elementDom) {
      const new_value = elementDom.scrollTop + elementDom.offsetHeight
      if(!maxOffset) {
        setMaxOffset(new_value)
      }
    }
  }, [ChatLog.current])

  const handleScroll = useCallback((e) => {
    const elementDom = e.target
    const new_value = elementDom.scrollTop + elementDom.offsetHeight
    const scrollHeight = elementDom.scrollHeight
    if (!maxOffset) {
      setMaxOffset(new_value)
    }
    else if ( Math.abs(maxOffset - new_value) > 100) {
      setMaxOffset(new_value)
    }
    // on end
    else if (new_value === scrollHeight) {
      setMaxOffset(scrollHeight)
    }
  }, [maxOffset])
  
  return (
    <StyledChatLog
      onScroll={handleScroll}
      ref={ChatLog}
    >
      {
        success
          ? data && data.messages.length > 0
            ? data.messages.map(message => {
                return (
                  <Fragment key={message.id}>
                    <NewMessagesLabel
                      id={message.id}
                      firstUnread={firstUnread}
                    />
                    <Message
                      key={message.id}
                      maxOffset={maxOffset}
                      message={message}
                      {...messageProps}
                    />
                  </Fragment>
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
  data: PropTypes.object,
  fetching: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  error: PropTypes.string,
  firstUnread: PropTypes.number,
};

export default ChatLog;
