import { combineReducers } from 'redux'
import headerReducer from './headerReducer'
import dialogsReducer from './dialogsReducer'
import groupsReducer from './groupReducer'
import websocketReducer from './websocketReducer'
import notificationReducer from './notificationReducer'
import profilePageReducer from './profilePageReducer'

const AppReducer = combineReducers({
  header: headerReducer,
  notification: notificationReducer,
  dialogs: dialogsReducer,
  groups: groupsReducer,
  websocket: websocketReducer,
  profilePage: profilePageReducer,
})

export default AppReducer
