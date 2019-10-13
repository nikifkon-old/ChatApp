import { combineReducers } from 'redux'
import headerReducer from './headerReducer'
import tabsReducer from './tabsReducer'
import dialogsReducer from './dialogsReducer'
import websocketReducer from './websocketReducer'

const AppReducer = combineReducers({
  header: headerReducer,
  tabs: tabsReducer,
  dialogs: dialogsReducer,
  websocket: websocketReducer,
})

export default AppReducer
