import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { StylesProvider } from "@material-ui/styles";

import GlobalStyle, { Wrapper, PageContainer } from '../styles';
import {
  Home,
  GetStarted,
  Login,
  ChatAppRoute,
  Route404,
} from '../routes';
import {
  Header,
} from '../components';
import {
  RedirectMessage,
  AppMessage,
} from '../components/SnackBar'
import {
  Private,
  AuthRouter,
} from '../HOC';

function App() {
  return (
    <StylesProvider injectFirst>
      <Wrapper>
        <Header />
        <PageContainer
          container
          direction="column"
          background="#edeef0"
        >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/app" component={Private(ChatAppRoute)} />
            <Route path="/get-started" component={AuthRouter(GetStarted)} />
            <Route path="/login" component={AuthRouter(Login)} />
            <Route path="/" component={Route404} />
          </Switch>
        </PageContainer>
      </Wrapper>
      <GlobalStyle />
      <RedirectMessage />
      <AppMessage />
    </StylesProvider>
  );
}

export default App;
