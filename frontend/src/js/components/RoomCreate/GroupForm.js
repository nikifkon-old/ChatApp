import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form'

import { ColoredLine, FinalFormTextField } from '../index'
import { createGroup } from '../../actions/groupActions';
import { P, Btn, H4 } from '../../styles'
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
      <ColoredLine color="secondary" />
      <Form
        onSubmit={handleSubmit}
        render={({handleSubmit}) => (
          <CreatingForm container
            direction="column"
            component="form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
           >
            <Field
              component={FinalFormTextField}
              name="name"
              label="Group name"
              variant="outlined"
              margin="normal"
              styled
              required
            />
            <Field
              component={FinalFormTextField}
              name="slug"
              label="Unique name"
              variant="outlined"
              margin="normal"
              styled
              required
            />
            <Field
              component={FinalFormTextField}
              name="description"
              label="Description"
              multiline
              variant="outlined"
              margin="normal"
              styled
            />
            <Btn type="submit" color="primary">Create</Btn>
          </CreatingForm>
        )}
      />
    </Fragment>
  );
}

export default GroupForm;
