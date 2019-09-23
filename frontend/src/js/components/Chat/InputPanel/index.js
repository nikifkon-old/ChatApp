import React from 'react'
import { Form, Field } from 'react-final-form'
import PropTypes from 'prop-types'

import { IconButton } from '../../index'
import { StyledForm, MainInput } from '../styles'

const InputPanel = ({sendMessage}) => {
  return (
    <Form
      onSubmit={(data) => sendMessage(data.text)}
      render={({handleSubmit}) => (
        <StyledForm onSubmit={handleSubmit}>
          <IconButton icon="attach_file"/>
          <Field
            component={MainInput}
            name="text"
            variant="outlined"
            margin="normal"
          />
          <IconButton icon="insert_emoticon" />
          <IconButton icon="send" type="submit" />
        </StyledForm>
      )}
    />
  )
}

InputPanel.propTypes = {
  sendMessage: PropTypes.func.isRequired,
}

export default InputPanel
