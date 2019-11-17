import React, { Fragment } from 'react'
import { P, TextField, Btn } from '../../styles'
import { Form, Field } from 'react-final-form'
import { CreatingForm } from './styles';
import { useDispatch } from 'react-redux';
import { createGroup } from '../../actions/groupActions';

function GroupForm() {
  const dispatch = useDispatch()

  const handleSubmit = ({name, slug, description, img}) => {
    img = img.replace("C:\\fakepath\\", "")
    dispatch(createGroup({
      name, slug, description, img
    }))
  }

  return (
    <Fragment>
      <P>Fill in form below: </P>
      <Form
        onSubmit={handleSubmit}
        render={({handleSubmit}) => (
          <CreatingForm onSubmit={handleSubmit}>
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
            <Field
              component="input"
              name="img"
              type="file"
              accept="image/*"
              hidden
              id="load-file-group-form"
            />
            <label htmlFor="load-file-group-form">
              <Btn component="span">Load avatar</Btn>
            </label>
            <Btn type="submit">Create</Btn>
          </CreatingForm>
        )}
      />
    </Fragment>
  );
}

export default GroupForm;
