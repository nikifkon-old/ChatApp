import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import AuthReducer from './Authorization'
import appReducer from './ChatApp'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  app: appReducer,
  auth: AuthReducer,
})

export default createRootReducer
