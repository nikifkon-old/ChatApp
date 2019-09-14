import { combineReducers } from 'redux'
import headerReducer from './headerReducer'
import tabsReducer from './tabsReducer'
import dialogsReducer from './dialogsReducer'

const AppReducer = combineReducers({
  header: headerReducer,
  tabs: tabsReducer,
  dialogs: dialogsReducer,
})

export default AppReducer
