import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  sendMessageInDialog,
  deleteMessageInDialog,
  updateMessageInDialog,
} from '../actions/chatActions'
import {
  getActiveDialog,
  getDialogs,
} from '../reducers/selectors'

export default function (Chat) {
  class withDialogData extends React.Component {
    static propTypes = {
      data: PropTypes.object,
      sendMessageInDialog: PropTypes.func.isRequired,
      deleteMessageInDialog: PropTypes.func.isRequired,
      updateMessageInDialog: PropTypes.func.isRequired,
    }

    render() {
      return (
        <Chat {...this.props} {...this.state} />
      )
    }
  }

  const mapStateToProps = state => {
    const activeDialog = getActiveDialog(state)
    const dialogs = getDialogs(state)
    const { fetching, success, error } = dialogs

    return {
      activeDialog,
      fetching,
      success,
      error,
    }
}

  return connect(
    mapStateToProps,
    {
      sendMessageInDialog,
      deleteMessageInDialog,
      updateMessageInDialog,
    }
  )(withDialogData)
}
