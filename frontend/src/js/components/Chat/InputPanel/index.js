import React from 'react'
import { Form, Field } from 'react-final-form'
import PropTypes from 'prop-types'

import AttachFile from './AttachFile'
import Emotion from './Emotion'
import { IconButton } from '../../index'
import { StyledForm, MainInput } from '../styles'

const InputPanel = ({sendMessage, id}) => {
  const handleSend = ({text}) => {
    return new Promise((resolve) => {
      sendMessage({text, id})
      resolve()
    })
  }
  return (
    <Form
      onSubmit={handleSend}
      render={({handleSubmit, form}) => (
        <StyledForm onSubmit={
          async (event) => {
            await handleSubmit(event)
            form.reset()
          }
        }>
          <AttachFile />
          <Field
            component={MainInput}
            name="text"
            variant="outlined"
            margin="normal"
          />
          <Emotion />
          <IconButton icon="send" type="submit" />
        </StyledForm>
      )}
    />
  )
}

InputPanel.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  id: PropTypes.number,
}

export default InputPanel
