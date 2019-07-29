import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'

import configureAppStore from './redux/configureStore'
import GlobalStyle, { MuiTheme, Wrapper } from './styles'
import Home from './routes/Home'
import GetStarted from './routes/GetStarted'
import Login from './routes/Login'

const store = configureAppStore({})

const App = () => {
    return (
        <Provider store={store}>
          <MuiThemeProvider theme={MuiTheme}>
            <Wrapper>
              <BrowserRouter>
                <Route exact path="/" component={Home} />
                <Route path="/get-started" component={GetStarted} />
                <Route path="/login" component={Login} />
              </BrowserRouter>  
            </Wrapper>
            <GlobalStyle />
          </MuiThemeProvider>
        </Provider>
    )
}

export default App