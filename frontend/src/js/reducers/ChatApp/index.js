import { combineReducers } from 'redux'
import headerReducer from './headerReducer'

const AppReducer = combineReducers({
  header: headerReducer,
})

export default AppReducer
