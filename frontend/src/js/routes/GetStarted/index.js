import React, { Fragment } from 'react'

import { H1, SectionContainer, ContentGrid, Content } from '../../styles'
import { LoginForm } from '../../containers'

const GetStarted = () => {
    return (
      <Fragment>
        <SectionContainer
          container
          direction="column"
          alignItems="center"
          horizontal_center="true"
        >
          <ContentGrid container>
            <Content>
              Get Started
            </Content>
          </ContentGrid>
          <LoginForm />
        </SectionContainer>
      </Fragment>
    )
}

export default GetStarted