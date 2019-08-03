import React, { Component, Fragment } from 'react'
import { Form, Field } from 'react-final-form'
import { connect } from 'react-redux'
import { createSelector } from 'redux-starter-kit'
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

import { actions } from './LoginForm.redux'
import { Btn, 
  ContentGrid,
  Content,
  TextField,
  StyledForm
} from '../../styles'
import { required } from '../../utils'
import { ErrorMessage } from '../../components'

export class LoginForm extends Component{
  onSubmit = values => {
    const { LoginUser, history } = this.props
    LoginUser(values, history)
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
                alignContent="center"
              >
                <ErrorMessage status={status} />
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

LoginForm.propTypes = {
  status: PropTypes.number,
  LoginUser: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
}

const LoginStatusSelector = createSelector(
  ['login.ui.requestStatus']
)
const AuthorizationSelector = createSelector(
  ['auth.isAuth']
)

const mapStateToProps = state => ({
  status: LoginStatusSelector(state),
  isAuth: AuthorizationSelector(state),
})

export default connect(mapStateToProps, actions)(withRouter(LoginForm))