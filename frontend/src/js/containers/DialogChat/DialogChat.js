import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  Chat,
} from '../../components'
import {
  sendMessageInDialog,
  setAsRead,
  updateMessageInDialog,
  deleteMessageInDialog,
} from '../../actions/dialogActions'
import {
  dialogSelectors,
} from '../../selectors'
import { getFirstUnread } from '../../selectors/DialogSelectors'

const { getActiveDialogId, getDialog, getDialogs } = dialogSelectors

const DialogChat = (props) => {
  let {
    dialog,
    fetching,
    success,
    error,
    firstUnread,
    sendMessageInDialog,
    setAsRead,
    updateMessageInDialog,
    deleteMessageInDialog,
  } = props

  let title = dialog && dialog.interlocutor.user
  let id = dialog && dialog.id

  return (
    <Chat
      logProps={{
        data: dialog,
        fetching,
        success,
        error,
        firstUnread
      }}
      topPanelProps={{
        title
      }}
      inputProps={{
        sendMessage: sendMessageInDialog,
        id
      }}
      messageProps={{
        setAsRead,
        updateMessage: updateMessageInDialog,
        deleteMessage: deleteMessageInDialog
      }}
    />
  )
}

const mapStateToProps = state => {
  const dialogs = getDialogs(state)
  const { fetching, success, error } = dialogs
  const active = getActiveDialogId(state)
  const dialog = getDialog(state, active)
  const firstUnread = getFirstUnread(state)

  return {
    dialog,
    fetching,
    success,
    error,
    firstUnread
  }
}

DialogChat.propTypes = {
  sendMessageInDialog: PropTypes.func.isRequired,
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
    setAsRead,
    updateMessageInDialog,
    deleteMessageInDialog,
  }
)(DialogChat);
