import React, { Fragment, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Field } from 'react-final-form'

import { createDialog } from '../../actions/dialogActions'
import { IconButton, ColoredLine } from '../index'
import { CreatingForm } from './styles'
import { TextField, H4, Content } from '../../styles'

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
      <ColoredLine color={props => props.theme.color.secondary} />

      <Form
        onSubmit={handleSubmit}
        render={
          ({handleSubmit}) => (
          <CreatingForm onSubmit={handleSubmit}>
            <Content>
              <Field
                component={TextField}
                width="calc(100% - 48px)"
                name="id"
                variant="outlined"
                placeholder="person id"
              />
              <IconButton
                icon="person_add"
                type="submit"
              />
            </Content>
          </CreatingForm>
        )}
      />
    </Fragment>
  );
}

export default DialogForm;
