import { combineReducers } from 'redux'
import headerReducer from './headerReducer'
import tabsReducer from './tabsReducer'

const AppReducer = combineReducers({
  header: headerReducer,
  tabs: tabsReducer,
})

export default AppReducer
