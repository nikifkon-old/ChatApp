import React, { Component, Fragment } from 'react'
import { Form, Field } from 'react-final-form'
import { connect } from 'react-redux'
// import { createSelector } from 'redux-starter-kit'
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

import { actions } from './SingUpForm.redux'
import { Btn, 
  ContentGrid, 
  Content, 
  TextField, 
  StyledForm 
} from '../../styles'
import { composeValidators, isEmail, required, manyThen } from '../../utils'
import { ErrorMessage } from '../../components'

export class SingUpForm extends Component {
  onSubmit = values => {
    const { SingUpUser, history } = this.props
    SingUpUser(values, history)
  }

  render() {
    const { status } = this.props

    return (
      <Fragment>
        <Form
          onSubmit={this.onSubmit}
          render={({handleSubmit}) => (
            <StyledForm onSubmit={handleSubmit}>
              <ContentGrid container
                direction="column"
                alignItems="center"
              >
                <ErrorMessage status={status} />
                <Content fullWidth>
                  <Field
                    type="text"
                    name="username"
                    validate={composeValidators(required, manyThen(4))}
                    placeholder="Username"
                    component={TextField}
                    variant="outlined"
                    margin="dense"
                    fullWidth
                   />
                </Content>
                <Content fullWidth>
                  <Field
                    type="email"
                    name="email"
                    validate={composeValidators(required, isEmail)}
                    placeholder="Email"
                    component={TextField}
                    variant="outlined"
                    margin="dense"
                    fullWidth
                   />
                </Content>
                <Content fullWidth>
                  <Field
                    type="password"
                    name="password"
                    validate={required}
                    placeholder="Password"
                    component={TextField}
                    variant="outlined"
                    margin="dense"
                    fullWidth
                   />
                </Content>
                <Content fullWidth>
                  <Btn 
                    type="submit"
                    fullWidth
                  >
                   Sing Up
                  </Btn>
                </Content>
              </ContentGrid>
            </StyledForm>
          )}
         />
      </Fragment>
    )
  }
}

SingUpForm.propTypes = {
  status: PropTypes.number,
  SingUpUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
}

const mapStateToProps = state => ({
  status: state.singup.ui.requestStatus
})

export default connect(mapStateToProps, actions)(withRouter(SingUpForm))