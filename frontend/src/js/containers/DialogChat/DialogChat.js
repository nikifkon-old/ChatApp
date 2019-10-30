import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  Chat,
} from '../../components'
import {
  sendMessageInDialog,
} from '../../actions/chatActions'
import {
  dialogSelectors,
} from '../../selectors'

const { getActiveDialogId, getDialog, getDialogs } = dialogSelectors

const DialogChat = (props) => {
  let {
    dialog,
    fetching,
    success,
    error,
    sendMessageInDialog,
  } = props

  let data = dialog && {
    id: dialog.id,
    title: dialog.interlocutor.user,
    messages: dialog.messages,
  }

  return (
    <Chat
      data={data}
      fetching={fetching}
      success={success}
      error={error}
      sendMessage={sendMessageInDialog}
    />
  )
}

const mapStateToProps = state => {
  const dialogs = getDialogs(state)
  const { fetching, success, error } = dialogs
  const active = getActiveDialogId(state)
  const dialog = getDialog(state, active)
  return {
    dialog,
    fetching,
    success,
    error,
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
  }
)(DialogChat);
