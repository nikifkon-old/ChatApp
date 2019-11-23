import { combineReducers } from 'redux'

import AuthReducer from './Authorization'
import appReducer from './ChatApp'
import createRouterReducer from './Router/routerReducer'

const createRootReducer = (history) => combineReducers({
  router: createRouterReducer(history),
  app: appReducer,
  auth: AuthReducer,
})

export default createRootReducer
