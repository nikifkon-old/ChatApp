import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { StylesProvider } from "@material-ui/styles";

import GlobalStyle, { Wrapper, PageContainer } from '../styles'
import {
  Home,
  GetStarted,
  Login,
  ChatAppRoute,
} from '../routes'
import {
  Header,
  PropsRoute,
} from '../components'
import { Private, AuthRouter } from '../HOC'


function App() {
  const [headerIsOpen, setHeaderIsOpen] = React.useState(true)

  function handleHeader() {
    setHeaderIsOpen(!headerIsOpen)
  }

  return (
    <StylesProvider injectFirst>
      <Wrapper>
        <Header isOpen={headerIsOpen} />
        <PageContainer
          headerIsOpen={headerIsOpen}
          container
          direction="column"
          background="#edeef0"
        >
          <Switch>
            <Route exact path="/" component={Home} />
            <PropsRoute path="/app" component={Private(ChatAppRoute)} handleHeader={handleHeader} />
            <Route path="/get-started" component={AuthRouter(GetStarted)} />
            <Route path="/login" component={AuthRouter(Login)} />
          </Switch>
        </PageContainer>
      </Wrapper>
      <GlobalStyle />
    </StylesProvider>
  )
}

export default App
