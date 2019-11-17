import React, { Fragment } from 'react'
import { P, TextField, Btn } from '../../styles'
import { Form, Field } from 'react-final-form'
import { CreatingForm } from './styles';
import { useDispatch } from 'react-redux';
import { createGroup } from '../../actions/groupActions';

function GroupForm() {
  const dispatch = useDispatch()

  const handleSubmit = ({name, slug, description}) => {
    dispatch(createGroup({
      name, slug, description
    }))
  }

  return (
    <Fragment>
      <P>Fill in form below: </P>
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
