import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { StylesProvider } from "@material-ui/styles";

import GlobalStyle, { Wrapper, PageContainer } from '../styles'
import Home from '../routes/Home'
import GetStarted from '../routes/GetStarted'
import Login from '../routes/Login'
import { ChatApp } from '../containers'
import { Header } from '../components'
import { Private, AuthRouter, withHeaderStatus } from '../HOC'


class App extends Component {
  static propTypes = {
    headerStatus: PropTypes.bool.isRequired
  }

  render() {
    const {headerStatus} = this.props
    return (
      <StylesProvider injectFirst>
        <Wrapper>
          <Header isOpen={headerStatus} />
          <PageContainer
            menuisopen={headerStatus}
            container
            direction="column"
            background="#edeef0"
          >
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/app" component={Private(ChatApp)} />
              <Route path="/get-started" component={AuthRouter(GetStarted)} />
              <Route path="/login" component={AuthRouter(Login)} />
            </Switch>
          </PageContainer>
        </Wrapper>
        <GlobalStyle />
      </StylesProvider>
    )
  }
}

export default withHeaderStatus(App)
