import React from 'react'
import PropTypes from 'prop-types'

import {
  StyledMessage,
  MessageDate,
  MessageText,
  MessageSender,
  MessageAvatar,
} from '../styles'

const Message = ({message}) => {
  const { sender_name, avatar, text, date } = message

  return (
    <StyledMessage>
      <MessageAvatar src={avatar} alt='avatar' />
      <MessageSender>{sender_name}</MessageSender>
      <MessageText>{text}</MessageText>
      <MessageDate>{date}</MessageDate>
    </StyledMessage>
  )
}

Message.propTypes = {
  message: PropTypes.shape({
    sender: PropTypes.number.isRequired,
    sender_name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired
}

export default Message
