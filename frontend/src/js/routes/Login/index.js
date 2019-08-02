import React, { Fragment } from 'react'

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

export default Login