import { combineReducers } from 'redux'
import headerReducer from './headerReducer'
import dialogsReducer from './dialogsReducer'
import groupsReducer from './groupReducer'
import websocketReducer from './websocketReducer'

const AppReducer = combineReducers({
  header: headerReducer,
  dialogs: dialogsReducer,
  groups: groupsReducer,
  websocket: websocketReducer,
})

export default AppReducer
