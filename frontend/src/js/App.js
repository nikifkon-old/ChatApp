import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import configureAppStore from './redux/configureStore'
import GlobalStyle from './styles'
import Home from './routes/Home'

const store = configureAppStore({})

const App = () => {
    return (
        <Provider store={store}>
          <BrowserRouter>
            <Route exact path="/" component={Home} />
          </BrowserRouter>
          <GlobalStyle />
        </Provider>
    )
}

export default App