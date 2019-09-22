import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  sendMessage,
  insertNewMessage
} from '../actions/chatActions'
import {
  getActiveDialog,
  getAccessToken,
} from '../reducers/selectors'

export default function (Chat) {
  class withDialogData extends React.Component {
    static propTypes = {
      data: PropTypes.object,
      sendMessage: PropTypes.func.isRequired,
      accessToken: PropTypes.string,
    }

    render() {
      return (
        <Chat {...this.props} {...this.state} />
      )
    }
  }

  const mapStateToProps = state => {
    const activeDialog = getActiveDialog(state)
    const accessToken = getAccessToken(state)
    return {
      activeDialog,
      accessToken,
    }
}

  return connect(
    mapStateToProps,
    {
      sendMessage,
      insertNewMessage,
    }
  )(withDialogData)
}
