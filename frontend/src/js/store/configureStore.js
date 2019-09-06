import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import localStorageToReduxStore from './localstorage'
import createRootReducer from '../reducers'
import rootSaga from '../sagas'

const initialState = localStorageToReduxStore()
export const history = createBrowserHistory()

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const routerMiddleware = createRouterMiddleware(history)

  const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware,
      ),
    ),
  )
  sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore
