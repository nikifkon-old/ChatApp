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
    topPanelProps,
    logProps,
    messageProps,
    inputProps,
  } = props

  return (
    <StyledChatWrap>
    <StyledChat>
      <TopPanel {...topPanelProps}/>
      <ChatLog
        messageProps={messageProps}
        {...logProps}
      />
      <InputPanel {...inputProps}/>
    </StyledChat>
    </StyledChatWrap>
  );
}

Chat.propTypes = {
  firstUnread: PropTypes.number,
  logProps: PropTypes.object.isRequired,
  messageProps: PropTypes.object.isRequired,
  inputProps: PropTypes.object.isRequired,
};

export default Chat;
