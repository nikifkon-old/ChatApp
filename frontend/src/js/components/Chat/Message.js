import React, { useState, useEffect, useCallback, createRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';

import {
  IconButton,
  EmojiedText,
} from '../index'
import {
  setAsRead,
} from '../../actions/chatActions'
import {
  StyledMessage,
  MessageDate,
  MessageAvatar,
  MessageText,
  EditMessageInput,
} from './styles'
import { H4, GridItem } from '../../styles'

function Message(props) {
  const {
    message,
    deleteMessage,
    updateMessage,
    maxOffset,
  } = props

  const { id, sender_name, dialog, unread, avatar, text, date } = message
  const [edited, setEdited] = useState(false)

  function toggleEdit() {
    setEdited(!edited)
  }

  function handleDelete() {
    deleteMessage({id})
  }

  function handleUpdate({text}) {
    updateMessage({id, text})
    setEdited(false)
  }

  const Message = createRef()
  const dispatch = useDispatch()

  const handleUnread = useCallback((e) => {
    if( e.offsetTop + e.scrollHeight - 80 < maxOffset) {
      dispatch(setAsRead({
        dialog_id: dialog,
        message_id: id,
      }))
    }
  }, [dialog, dispatch, id, maxOffset])

  useEffect(() => {
    if (unread) {
      const messageDom = Message.current
      handleUnread(messageDom)
    }
  }, [Message, maxOffset, handleUnread, unread])


  return (
    <StyledMessage
      ref={Message}
    >
      <MessageAvatar src={avatar} alt='avatar' />

      <GridItem
        component={H4}
        column="2"
        row="1/2"
        >
        {sender_name} - {unread ? "true" : "false"}
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
        <IconButton icon="edit" onClick={toggleEdit} size="small" />
      </GridItem>

      <GridItem
        column="5"
        row="1"
        center
        >
        <IconButton icon="delete" onClick={handleDelete} size="small" />
      </GridItem>

      <MessageText>
        {
          edited ?
          <Form
            onSubmit={handleUpdate}
            render={
              ({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                  <Field
                    component={EditMessageInput}
                    name="text"
                    defaultValue={text}
                    InputProps={{disableUnderline: true}}
                    autoFocus
                  />
                </form>
              )
            }
          />
          :
          <EmojiedText text={text}/>
        }
      </MessageText>

      <MessageDate>{new Date(date).toLocaleString()}</MessageDate>

    </StyledMessage>
  );
}

Message.propTypes = {
  deleteMessage: PropTypes.func.isRequired,
  updateMessage: PropTypes.func.isRequired,
  maxOffset: PropTypes.number.isRequired,
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    sender: PropTypes.number.isRequired,
    dialog: PropTypes.number.isRequired,
    sender_name: PropTypes.string.isRequired,
    unread: PropTypes.bool.isRequired,
    avatar: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired
};

export default Message;
