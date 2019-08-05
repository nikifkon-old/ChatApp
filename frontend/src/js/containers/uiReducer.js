import { combineReducers } from 'redux'

import HeaderReducer from './Header/Header.redux'

const uiReducer = combineReducers({
  header: HeaderReducer,
})

export default uiReducer