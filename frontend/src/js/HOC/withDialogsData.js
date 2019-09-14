import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { setActiveDialog } from '../actions/chatActions'
import { getDialogs } from '../reducers/selectors'

export default function (FriendList) {
  class withDialogsData extends React.Component {
    static propTypes = {
      data: PropTypes.array,
      fetching: PropTypes.bool.isRequired,
      success: PropTypes.bool.isRequired,
      error: PropTypes.object,
      setActiveDialog: PropTypes.func.isRequired,
    }

    render() {
      return (
        <FriendList {...this.props} {...this.state} />
      )
    }
  }

  const mapStateToProps = state => {
    const dialogs = getDialogs(state)

    return {
      data: dialogs.data,
      fetching: dialogs.fetching,
      success: dialogs.success,
      error: dialogs.error,
    }
}

  return connect(
    mapStateToProps,
    {
      setActiveDialog
    }
  )(withDialogsData)
}
