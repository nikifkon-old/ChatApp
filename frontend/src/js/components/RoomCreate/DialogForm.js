import React, { Fragment, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Field } from 'react-final-form'

import { createDialog, } from '../../actions/dialogActions'
import { IconButton, ColoredLine, TextField } from '../index'
import { CreatingForm } from './styles'
import { H4, ContentGrid } from '../../styles'

const DialogForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = useCallback((values) => {
    dispatch(createDialog({
      person_id: values.id,
    }))
  }, [dispatch])

  return (
    <Fragment>
      <H4 center>Create Dialog</H4>
      <ColoredLine color="secondary" />

      <Form
        onSubmit={handleSubmit}
        render={
          ({handleSubmit}) => (
          <CreatingForm container
            wrap="nowrap"
            onSubmit={handleSubmit}
          >
            <Field
              component={TextField}
              width="calc(100% - 48px)"
              name="id"
              variant="outlined"
              margin="normal"
              placeholder="person id"
              styled
            />
            <IconButton
              icon="person_add"
              type="submit"
              color="active"
            />
          </CreatingForm>
        )}
      />
    </Fragment>
  );
}

export default DialogForm;
