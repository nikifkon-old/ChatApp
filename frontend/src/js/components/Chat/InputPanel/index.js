import React from 'react'
import { Form, Field } from 'react-final-form'
import PropTypes from 'prop-types'

import { StyledForm, MainInput } from '../styles'
import { IconBtn } from '../../../styles'

const InputPanel = ({addNewMessage}) => {
  return (
    <Form
      onSubmit={(data) => addNewMessage(data.text)}
      render={({handleSubmit}) => (
        <StyledForm onSubmit={handleSubmit}>
          <IconBtn>
            <i className="material-icons">
              attach_file
            </i>
          </IconBtn>
          <Field
            component={MainInput}
            name="text"
            variant="outlined"
            margin="normal"
          />
          <IconBtn>
            <i className="material-icons">
              insert_emoticon
            </i>
          </IconBtn>
          <IconBtn type="submit">
            <i className="material-icons">
              send
            </i>
          </IconBtn>
        </StyledForm>
      )}
    />
  )
}

InputPanel.propTypes = {
  addNewMessage: PropTypes.func.isRequired,
}

export default InputPanel
