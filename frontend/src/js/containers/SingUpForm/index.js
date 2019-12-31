import React, { Component, Fragment } from 'react'
import { Form, Field } from 'react-final-form'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

import {
  Btn,
  ContentGrid,
  Content,
  StyledForm
} from '../../styles'
import { singUpUser } from '../../actions/authActions'
import { composeValidators, isEmail, required, manyThen } from '../../utils'
import { ErrorMessage, TextField } from '../../components'
import { getSingUpStatus } from '../../selectors/AuthSelectors';

export class SingUpForm extends Component {

  static propTypes = {
    errorStatus: PropTypes.oneOfType([
      PropTypes.bool.isRequired,
      PropTypes.number.isRequired
    ]),
    singUpUser: PropTypes.func.isRequired
  }

  onSubmit = values => {
    const { singUpUser } = this.props
    singUpUser(values)
  }

  render() {
    const { errorStatus } = this.props

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
                <ErrorMessage status={errorStatus} />
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
                    color="primary"
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

const mapStateToProps = state => {
  return {
    errorStatus: getSingUpStatus(state)
  }
}

export default connect(
  mapStateToProps,
  {
    singUpUser
  }
)(withRouter(SingUpForm))
