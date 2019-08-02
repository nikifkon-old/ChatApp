import React from 'react'
import PropTypes from 'prop-types';

import { H1, SectionContainer, ContentGrid, Content } from '../../styles'
import { LoginForm } from '../../containers'

const Login = ({history}) => {
    return (
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
        <LoginForm history={history}/>
      </SectionContainer>
    )
}

Login.propTypes  = {
  history: PropTypes.shape({
    push: PropTypes.func
  })
}

export default Login