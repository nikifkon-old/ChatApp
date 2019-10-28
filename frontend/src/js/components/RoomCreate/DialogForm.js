import React, { Fragment, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Field } from 'react-final-form'

import { createDialog } from '../../actions/chatActions'
import { IconButton } from '../index'
import { CreatingForm } from './styles'
import { TextField, P } from '../../styles'

const DialogForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = useCallback((values) => {
    dispatch(createDialog({
      person_id: values.id,
    }))
  }, [dispatch])

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
  );
}

export default DialogForm;
