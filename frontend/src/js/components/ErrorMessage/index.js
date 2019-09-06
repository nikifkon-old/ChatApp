import React from 'react'
import PropTypes from 'prop-types'

import { P } from '../../styles'

const ErrorMessage = ({ status }) => {
    let ErrorText

    if(status == 400) {
      ErrorText = "This username or email is already taken"
    }

    if(status == 401) {
      ErrorText = "Invalid username or password, please try again"
    }

    if(status == 403) {
      ErrorText = "403 Forbidden, please try again"
    }

    if(status >= 500 && status < 600) {
      ErrorText = "Something went wrong, try later"
    }

    return (
      <P color="orangered">{ErrorText}</P>
    )
}

ErrorMessage.propTypes = {
  status: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ])
}

export default ErrorMessage
