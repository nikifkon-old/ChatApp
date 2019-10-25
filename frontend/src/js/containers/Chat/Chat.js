import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  TopPanel,
  InputPanel,
  ChatLog,
} from '../../components/Chat'
import {
  sendMessageInDialog,
  deleteMessageInDialog,
  updateMessageInDialog,
} from '../../actions/chatActions'
import {
  getActiveDialog,
  getDialogs,
} from '../../reducers/selectors'
import {
  dialogSelectors,
} from '../../selectors'
import { StyledChat } from './styles'

const { getIdOfFirstUnreadMessageInActiveDialog } = dialogSelectors

const Chat = (props) => {
  const {
    dialog,
    fetching,
    success,
    error,
    firstUnread,
    sendMessageInDialog,
    deleteMessageInDialog,
    updateMessageInDialog,
  } = props
  let id = dialog && dialog.id

  return (
    <StyledChat>
      <TopPanel dialog={dialog} />
      <ChatLog
        dialogData={dialog}
        firstUnread={firstUnread}
        fetching={fetching}
        success={success}
        error={error}
        deleteMessage={deleteMessageInDialog}
        updateMessage={updateMessageInDialog}
      />
      <InputPanel sendMessage={sendMessageInDialog} id={id}/>
    </StyledChat>
  );
}

const mapStateToProps = state => {
  const dialogs = getDialogs(state)
  const { fetching, success, error } = dialogs
  const data = getActiveDialog(state)
  let idOfFirstUnreadMessage
  if (data && data.messages.length > 0) {
    idOfFirstUnreadMessage = getIdOfFirstUnreadMessageInActiveDialog(state)
  }
  return {
    dialog: data,
    firstUnread: idOfFirstUnreadMessage,
    fetching,
    success,
    error,
  }
}

Chat.propTypes = {
  sendMessageInDialog: PropTypes.func.isRequired,
  deleteMessageInDialog: PropTypes.func.isRequired,
  updateMessageInDialog: PropTypes.func.isRequired,
  firstUnread: PropTypes.number,
  dialog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    last_message: PropTypes.object.isRequired,
    interlocutor: PropTypes.object.isRequired,
    messages: PropTypes.array,
  }),
  fetching: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default connect(
  mapStateToProps,
  {
    sendMessageInDialog,
    deleteMessageInDialog,
    updateMessageInDialog,
  }
)(Chat);
