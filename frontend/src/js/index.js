import 'babel-polyfill';
import 'emoji-mart/css/emoji-mart.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import { App } from './containers'
import configureStore, { history } from './store/configureStore'

export const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
document.getElementById('react-root'))
