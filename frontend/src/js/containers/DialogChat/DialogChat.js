import React from 'react'
import { connect, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import {
  Chat,
} from '../../components'
import {
  sendMessageInDialog,
  setAsReadDialogMessage,
  updateMessageInDialog,
  deleteMessageInDialog,
} from '../../actions/dialogActions'
import {
  getFirstUnread,
  selectDialogInfo,
  getActiveDialog
} from '../../selectors/DialogSelectors'
import { useAction } from '../../utils'

const DialogChat = () => {
  const info = useSelector(state => selectDialogInfo(state))
  const { fetching, success, error } = info

  const dialog = useSelector(state => getActiveDialog(state))
  let title = dialog && dialog.interlocutor.user
  let id = dialog && dialog.id
  const firstUnread = useSelector(state => getFirstUnread(state))

  const sendMessage = useAction(sendMessageInDialog)
  const setAsRead = useAction(setAsReadDialogMessage)
  const updateMessage= useAction(updateMessageInDialog)
  const deleteMessage = useAction(deleteMessageInDialog)

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
        sendMessage,
        id
      }}
      messageProps={{
        setAsRead,
        updateMessage,
        deleteMessage
      }}
    />
  );
}

// DialogChat.propTypes = {
//   sendMessageInDialog: PropTypes.func.isRequired,
//   firstUnread: PropTypes.number,
//   dialog: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     last_message: PropTypes.object.isRequired,
//     interlocutor: PropTypes.object.isRequired,
//     messages: PropTypes.array,
//   }),
//   fetching: PropTypes.bool.isRequired,
//   success: PropTypes.bool.isRequired,
//   error: PropTypes.string,
// };

export default DialogChat;
