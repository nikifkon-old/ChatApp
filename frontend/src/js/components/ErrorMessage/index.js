import React, { Fragment } from 'react'
import { P } from '../../styles'

const ErrorMessage = ({ errorText, status }) => {
    let ErrorText
    
    if(status >= 400 && status < 500) {
      ErrorText = "Invalid username or password, please try again"
    }
    
    if(status >= 500 && status < 600) {
      ErrorText = "Something went wrong, try later"
    }

    return (
      <P color="orangered">{ErrorText}</P>
    )
}

export default ErrorMessage