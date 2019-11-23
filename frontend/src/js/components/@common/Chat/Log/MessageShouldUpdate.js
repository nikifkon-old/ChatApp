import React, { Component, createRef } from 'react'

export default function(Message) {
  class MessageShouldUpdate extends Component {
    MessageRef = createRef()

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

    render() {
      return (
        <Message ref={this.MessageRef} {...this.props} />
      )
    }
  }
  return MessageShouldUpdate
}
