import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'

import configureAppStore from './redux/configureStore'
import GlobalStyle, { MuiTheme, Wrapper, PageContainer } from './styles'
import Home from './routes/Home'
import GetStarted from './routes/GetStarted'
import Login from './routes/Login'
import { Header } from './components'
import { ChatApp } from './containers'
import { RequireAuth, RedirectIfAuth } from './HOC'

const store = configureAppStore({})

// Auth if user in localStorage
const user = localStorage.getItem('user')
const username = localStorage.getItem('username')
if(user) {
  store.dispatch({
    type: "@auth/setAuth",
    payload: true
  })
  store.dispatch({
    type: "@login/setUserData",
    payload: { username }
  })
}

const App = () => {
    return (
        <Provider store={store}>
          <BrowserRouter>
            <MuiThemeProvider theme={MuiTheme}>
              <Wrapper>
                <Header />
                <PageContainer 
                  container 
                  direction="column"
                  background="#edeef0"
                >
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/get-started" component={RedirectIfAuth(GetStarted)} />
                    <Route path="/login" component={RedirectIfAuth(Login)} />
                    <Route path="/app" component={RequireAuth(ChatApp)} />
                  </Switch>
                </PageContainer>
              </Wrapper>
              <GlobalStyle />
            </MuiThemeProvider>
          </BrowserRouter>
        </Provider>
    )
}

export default App