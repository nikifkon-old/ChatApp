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
import { StyledChat } from './styles'

const Chat = (props) => {
  const {
    dialog,
    fetching,
    success,
    error,
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

  return {
    dialog: getActiveDialog(state),
    fetching,
    success,
    error,
  }
}
Chat.propTypes = {
  sendMessageInDialog: PropTypes.func.isRequired,
  deleteMessageInDialog: PropTypes.func.isRequired,
  updateMessageInDialog: PropTypes.func.isRequired,
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
