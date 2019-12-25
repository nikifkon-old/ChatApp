import React from 'react'
import PropTypes from 'prop-types'
import { Form, Field } from 'react-final-form'

import { GenderRadio } from './index'
import { StyledForm } from './styles'
import { TextField, GridItem, Btn } from '../../styles'

function ProfileForm({id, data, editable, editProfile}) {
  function handleSubmit(values) {
    editProfile({
      data: values,
      id
    })
  }

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={data}
      render={({handleSubmit}) => (
        <StyledForm onSubmit={handleSubmit}>
          <label>Username: </label>
          <Field
            component={TextField}
            variant="outlined"
            name="user"
            placeholder="username"
            disabled={!editable}
          />
          <label>Phone number: </label>
          <Field
            component={TextField}
            variant="outlined"
            name="tel"
            placeholder="tel"
            disabled={!editable}
          />

          <label>Gender: </label>
          <Field
            component={GenderRadio}
            name="gender"
            type="radio"
            disabled={!editable}
          />

          <label>Birth: </label>
          <Field
            component={TextField}
            type="date"
            variant="outlined"
            name="birth"
            placeholder="birth"
            disabled={!editable}
          />
          {editable &&
            <GridItem
              column="2/3"
              component={Btn}
              type="submit"
            >
              Edit profile
            </GridItem>
          }
        </StyledForm>
      )}
    />
  )
}

ProfileForm.propTypes = {
  id: PropTypes.number.isRequired,
  data: PropTypes.object,
  editable: PropTypes.bool.isRequired,
  editProfile: PropTypes.func.isRequired,
}

export default ProfileForm