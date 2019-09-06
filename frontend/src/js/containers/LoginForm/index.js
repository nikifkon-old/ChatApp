import React, { Component, Fragment } from 'react'
import { Form, Field } from 'react-final-form'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as types from '../../actions'
import { Btn,
  ContentGrid,
  Content,
  StyledForm
} from '../../styles'
import { required } from '../../utils'
import { ErrorMessage, TextField } from '../../components'

export class LoginForm extends Component{

  static propTypes = {
    loginJWT: PropTypes.func.isRequired,
    errorStatus: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.bool,
    ])
  }

  onSubmit = values => {
    const { loginJWT } = this.props
    loginJWT(values)
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
                alignContent="center"
              >
                <ErrorMessage status={errorStatus} />
                <Content fullWidth>
                  <Field
                    type="text"
                    name="username"
                    validate={required}
                    placeholder="Username"
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
                    fullWidth
                    type="submit"
                  >
                    Go
                  </Btn>
                </Content>
              </ContentGrid>
            </StyledForm>
            )
          }
        />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  let errorStatus
  try {
    errorStatus = state.auth.login.error.status
  } catch (error) {
    errorStatus = false
  }

  return {
    errorStatus: errorStatus
  }
}

const loginJWT = (values) => {
  return {
    type: types.LOGIN_WITH_JWT_REQUEST,
    payload: values
  }
}

export default connect(
  mapStateToProps,
  {
    loginJWT
  }
)(LoginForm)
