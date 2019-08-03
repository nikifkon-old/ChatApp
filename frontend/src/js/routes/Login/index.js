import React from 'react'

import { H1, SectionContainer, ContentGrid, Content } from '../../styles'
import { LoginForm } from '../../containers'

const Login = () => {
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
        <LoginForm />
      </SectionContainer>
    )
}

export default Login