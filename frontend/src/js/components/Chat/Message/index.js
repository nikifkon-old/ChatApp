import React from 'react'
import PropTypes from 'prop-types'

import { IconButton } from '../../index'
import {
  StyledMessage,
  MessageDate,
  MessageAvatar,
} from '../styles'
import { P, H4, GridItem } from '../../../styles'

const Message = ({message, deleteMessage}) => {
  const { id, sender_name, avatar, text, date } = message

  const handleDelete = () => {
    deleteMessage({id})
  }

  return (
    <StyledMessage>
      <MessageAvatar src={avatar} alt='avatar' />

      <GridItem
        component={H4}
        column="2"
        row="1/2"
        >
        {sender_name}
      </GridItem>

      <GridItem
        column="3"
        row="1"
        center
        >
        <IconButton icon="reply" size="small" />
      </GridItem>

      <GridItem
        column="4"
        row="1"
        center
        >
        <IconButton icon="edit" size="small" />
      </GridItem>

      <GridItem
        column="5"
        row="1"
        center
        >
        <IconButton onClick={handleDelete} icon="delete" size="small" />
      </GridItem>

      <GridItem
        component={P}
        column="2"
        row="2"
      >
        {text}
      </GridItem>

      <MessageDate>{date}</MessageDate>

    </StyledMessage>
  )
}

Message.propTypes = {
  deleteMessage: PropTypes.func.isRequired,
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    sender: PropTypes.number.isRequired,
    sender_name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired
}

export default Message
