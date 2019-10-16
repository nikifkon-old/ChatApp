import React from 'react';
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
  const scrollDiv = React.createRef()

  React.useEffect(() => {
    // always scroll to bottom
    scrollDiv.current.scrollTop = scrollDiv.current.scrollHeight
  })

  return (
    <StyledChatLog ref={scrollDiv}>
      {
        success
          ? dialogData && dialogData.messages.length > 0
            ? dialogData.messages.map(message =>
              <Message
                key={message.id}
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
