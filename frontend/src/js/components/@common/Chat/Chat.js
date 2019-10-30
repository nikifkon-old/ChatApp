import React from 'react'
import PropTypes from 'prop-types'

import {
  TopPanel,
  InputPanel,
  ChatLog,
} from './index'
import { StyledChatWrap } from '../../../styles'
import { StyledChat } from './styles'

const Chat = (props) => {
  const {
    data,
    fetching,
    success,
    error,
    sendMessage,
  } = props
  let id = data && data.id
  let title = data && data.title // TODO: check performance

  return (
    <StyledChatWrap>
    <StyledChat>
      <TopPanel title={title} />
      <ChatLog
        data={data}
        fetching={fetching}
        success={success}
        error={error}
      />
      <InputPanel sendMessage={sendMessage} id={id}/>
    </StyledChat>
    </StyledChatWrap>
  );
}

Chat.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  firstUnread: PropTypes.number,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    messages: PropTypes.array,
  }),
  fetching: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default Chat;
