import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getActiveDialog } from '../reducers/selectors'

export default function (Chat) {
  class withDialogData extends React.Component {
    static propTypes = {
      data: PropTypes.object,
    }

    render() {
      return (
        <Chat {...this.props} {...this.state} />
      )
    }
  }

  const mapStateToProps = state => {
    const activeDialog = getActiveDialog(state)
    return {
      activeDialog
    }
}

  return connect(
    mapStateToProps, null
  )(withDialogData)
}
