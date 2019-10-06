import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Field } from 'react-final-form'

import { IconButton } from '../index'
import { CreatingForm } from './styles'
import { TextField, P } from '../../styles'

const DialogForm = ({createDialog}) => {

  function handleSubmit(values) {
    if (values.id) {
      createDialog({id: values.id})
    }
  }

  return (
    <Fragment>
      <P center>Find people</P>
      <Form
        onSubmit={handleSubmit}
        render={
          ({handleSubmit}) => (
          <CreatingForm onSubmit={handleSubmit}>
            <Field
              component={TextField}
              width="85%"
              name="name"
              variant="outlined"
              placeholder="by name"
            />
            <IconButton
              icon="search"
              type="submit"
            />
          </CreatingForm>
        )}
      />

      <P center>-- or --</P>

      <Form
        onSubmit={handleSubmit}
        render={
          ({handleSubmit}) => (
          <CreatingForm onSubmit={handleSubmit}>
            <Field
              component={TextField}
              width="85%"
              name="id"
              variant="outlined"
              placeholder="by id"
            />
            <IconButton
              icon="search"
              type="submit"
            />
          </CreatingForm>
        )}
      />
    </Fragment>
  )
}

DialogForm.propTypes = {
  createDialog: PropTypes.func.isRequired,
}

export default DialogForm
