import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { H1, SectionContainer, ContentGrid, Content } from '../../styles'
import { LoginForm } from '../../containers'
import { Notification } from '../../components'

const Login = (props) => {
    return (
      <Fragment>
        { props.location.state && props.location.state.notification ? 
            <Notification message={props.location.state.notification.message} type="error" />
            : null
        }
        <SectionContainer
          container
          direction="column"
          justify="center"
          alignItems="center"
          horizontal_center="true"
        >
          <ContentGrid container>
            <Content center>
              <H1>Login</H1>
            </Content>
          </ContentGrid>
          <LoginForm />
        </SectionContainer>
      </Fragment>
    )
}

Login.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      notification: PropTypes.shape({
        message: PropTypes.string
      })
    })
  }).isRequired,
}

export default Login