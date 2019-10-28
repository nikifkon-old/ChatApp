import React, { Fragment, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types';

import {
  setAsRead,
  updateMessageInDialog,
} from '../../actions/chatActions'
import {
  routerSelectors
} from '../../selectors'
import Message from './Message'
import { Spinner, ColoredLine } from '../index'
import { StyledChatLog } from './styles'
import { dark_cont1, P } from '../../styles'

const { getQueryParams } = routerSelectors

function ChatLog(props) {
  const {
    dialogData,
    firstUnread,
    deleteMessage,
    updateMessage,
    success,
    error,
  } = props
  const ChatLog = React.createRef()

  const [maxOffset, setMaxOffset] = useState(null)

  const filter = useSelector(state => getQueryParams(state, 'filter'))

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
    else if (new_value === scrollHeight) {
      setMaxOffset(scrollHeight)
    }
  }, [maxOffset])

  const dispatch = useDispatch()

  const handleUnread = useCallback(({dialog, id}) => {
    dispatch(setAsRead({
      dialog_id: dialog,
      message_id: id,
    }))
  }, [dispatch])

  const starMessage = useCallback(({id, stared}) => {
    dispatch(updateMessageInDialog({
      id,
      stared: stared,
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
                  <Fragment key={message.id}>
                    {
                      message.id === firstUnread &&
                      filter !== 'stared'
                      && <ColoredLine
                        color={dark_cont1}
                        text="New Messages:"
                      />
                    }
                    <Message
                      key={message.id}
                      maxOffset={maxOffset}
                      message={message}
                      handleUnread={handleUnread}
                      deleteMessage={deleteMessage}
                      starMessage={starMessage}
                      updateMessage={updateMessage}
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
  dialogData: PropTypes.object,
  firstUnread: PropTypes.number,
  deleteMessage: PropTypes.func.isRequired,
  updateMessage: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default ChatLog;
