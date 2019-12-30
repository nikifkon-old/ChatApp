import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form'

import { ColoredLine } from '../index'
import { createGroup } from '../../actions/groupActions';
import { P, TextField, Btn, H4 } from '../../styles'
import { CreatingForm } from './styles';

function GroupForm() {
  const dispatch = useDispatch()

  const handleSubmit = ({name, slug, description}) => {
    dispatch(createGroup({
      name, slug, description
    }))
  }

  return (
    <Fragment>
      <H4 center>Create Group</H4>
      <P>Fill in form below: </P>
      <ColoredLine color={props => props.theme.color.secondary} />
      <Form
        onSubmit={handleSubmit}
        render={({handleSubmit}) => (
          <CreatingForm
            onSubmit={handleSubmit}
            enctype="multipart/form-data"
           >
            <Field
              component={TextField}
              name="name"
              label="Group name"
              variant="outlined"
              margin="normal"
              required
            />
            <Field
              component={TextField}
              name="slug"
              label="Unique name"
              variant="outlined"
              margin="normal"
              required
            />
            <Field
              component={TextField}
              name="description"
              label="Description"
              multiline
              variant="outlined"
              margin="normal"
            />
            <Btn type="submit">Create</Btn>
          </CreatingForm>
        )}
      />
    </Fragment>
  );
}

export default GroupForm;
