import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';

import {
  IconButton,
  EmojiedText,
} from '../../../index'
import {
  StyledMessage,
  MessageDate,
  MessageAvatar,
  MessageText,
  EditMessageInput,
} from '../styles'
import { H4, GridItem } from '../../../../styles'

class Message extends Component {
  state = {
    edited: false
  }

  static propTypes = {
    deleteMessage: PropTypes.func.isRequired,
    updateMessage: PropTypes.func.isRequired,
    setAsRead: PropTypes.func.isRequired,
    maxOffset: PropTypes.number,
    message: PropTypes.shape({
      id: PropTypes.number.isRequired,
      sender: PropTypes.number.isRequired,
      chat_id: PropTypes.number.isRequired,
      sender_name: PropTypes.string.isRequired,
      unread: PropTypes.bool.isRequired,
      stared: PropTypes.bool.isRequired,
      avatar: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }).isRequired
  };

  toggleEdit = () => {
    const { edited } = this.state
    this.setState({
      edited: !edited
    });
  }

  handleDelete = () => {
    const { deleteMessage, message } = this.props
    const { id } = message
    deleteMessage({id})
  }

  handleStar = () => {
    const { updateMessage, message } = this.props
    const { id, stared } = message
    updateMessage({
      id,
      stared: !stared
    })
  }

  handleUpdate = ({text}) => {
    const { updateMessage, message } = this.props
    const { id } = message
    updateMessage({id, text})
    this.setState({
      edited: false
    });
  }

  MessageRef = createRef()

  componentDidMount() {
    this.setAsRead()
  }

  componentDidUpdate() {
    this.setAsRead()
  }

  setAsRead() {
    const { setAsRead, message } = this.props;
    const { chat_id, id, unread } = message;
    if (unread) {
      const msg = this.MessageRef.current;
      const messageOffset = msg.offsetTop + msg.scrollHeight - 80;
      if (unread && messageOffset < this.props.maxOffset) {
        setAsRead({
          message_id: id,
          chat_id,
        });
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    const msg = this.MessageRef.current
    const unread = this.props.message.unread
    const messageOffset = msg.offsetTop + msg.scrollHeight - 80
    if (
        this.props.maxOffset !== nextProps.maxOffset &&
        (
          !unread || messageOffset > nextProps.maxOffset
        )
    ) {
      return false
    } else {
      return true
    }
  }

  render() {
    const { message } = this.props
    const { edited } = this.state
    const { sender_name, avatar, text, date, stared } = message

    let starBtnColor
    if (stared) {
      starBtnColor = "active"
    } else {
      starBtnColor = "normal"
    }
    return (
      <StyledMessage
        ref={this.MessageRef}
      >
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
          <IconButton icon="edit" onClick={this.toggleEdit} size="small" />
        </GridItem>

        <GridItem
          column="5"
          row="1"
          center
          >
          <IconButton icon="star"
            onClick={this.handleStar}
            size="small"
            color={starBtnColor}
          />
        </GridItem>

        <GridItem
          column="6"
          row="1"
          center
          >
          <IconButton icon="delete" onClick={this.handleDelete} size="small" />
        </GridItem>

        <MessageText>
          {
            edited ?
            <Form
              onSubmit={this.handleUpdate}
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
}

export default Message;
