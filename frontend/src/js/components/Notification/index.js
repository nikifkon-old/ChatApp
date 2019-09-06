import React from 'react'
import PropTypes from 'prop-types'

import { NotificationContainer } from './styles'
import { P } from '../../styles'

const Notification = ({message, type}) => {
    return (
        <NotificationContainer type={type}>
          <P color="#fff">{message}</P>
        </NotificationContainer>
    )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string
}

Notification.defaultProps = {
  type: "error"
}

export default Notification