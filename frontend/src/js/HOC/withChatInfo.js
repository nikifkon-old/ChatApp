import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  getActiveDialog,
} from '../reducers/selectors'

export default (ComposedComponent) => {
  class withChatData extends Component {
    static propTypes = {
      username: PropTypes.string,
    };

    render () {
      return <ComposedComponent {...this.props} />
    }
  }
  return connect(mapStateToProps)(withChatData)
}

const mapStateToProps = state => {
  const activeDialog = getActiveDialog(state)

  let interlocutor
  if(activeDialog) {
    interlocutor = activeDialog.interlocutor
  } else {
    interlocutor = null
  }

  return {
    interlocutor
  }
}
