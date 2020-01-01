import React, { Component, Fragment } from 'react'
import { Form, Field } from 'react-final-form'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  Btn,
  ContentGrid,
  Content,
  StyledForm
} from '../../styles'
import { loginJWT } from '../../actions/authActions'
import { required } from '../../utils'
import { ErrorMessage, FinalFormTextField } from '../../components'
import { getLoginStatus } from '../../selectors/AuthSelectors'

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
                    component={FinalFormTextField}
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
                    component={FinalFormTextField}
                    variant="outlined"
                    margin="dense"
                    fullWidth
                  />
                </Content>
                <Content fullWidth>
                  <Btn
                    fullWidth
                    color="primary"
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
  return {
    errorStatus: getLoginStatus(state) 
  }
}

export default connect(
  mapStateToProps,
  {
    loginJWT
  }
)(LoginForm)
