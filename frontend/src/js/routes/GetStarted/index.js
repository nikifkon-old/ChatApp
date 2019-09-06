import React, { Fragment } from 'react'

import { SectionContainer, ContentGrid, Content, H1 } from '../../styles'
import { SingUpForm } from '../../containers'

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
            <Content marginAuto>
              <H1>Get Started</H1>
            </Content>
          </ContentGrid>
          <SingUpForm />
        </SectionContainer>
      </Fragment>
    )
}

export default GetStarted
