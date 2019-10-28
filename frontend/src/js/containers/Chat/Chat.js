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
} from '../../actions/chatActions'
import {
  dialogSelectors,
} from '../../selectors'
import { StyledChat } from './styles'

const { getActiveDialogId, getDialog, getDialogs } = dialogSelectors

const Chat = (props) => {
  const {
    dialog,
    fetching,
    success,
    error,
    sendMessageInDialog,
  } = props
  let id = dialog && dialog.id

  return (
    <StyledChat>
      <TopPanel dialog={dialog} />
      <ChatLog
        dialogData={dialog}
        fetching={fetching}
        success={success}
        error={error}
      />
      <InputPanel sendMessage={sendMessageInDialog} id={id}/>
    </StyledChat>
  );
}

const mapStateToProps = state => {
  const dialogs = getDialogs(state)
  const { fetching, success, error } = dialogs
  const active = getActiveDialogId(state)
  const data = getDialog(state, active)
  return {
    dialog: data,
    fetching,
    success,
    error,
  }
}

Chat.propTypes = {
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
)(Chat);
