import { combineReducers } from 'redux'
import headerReducer from './headerReducer'
import dialogsReducer from './dialogsReducer'
import websocketReducer from './websocketReducer'

const AppReducer = combineReducers({
  header: headerReducer,
  dialogs: dialogsReducer,
  websocket: websocketReducer,
})

export default AppReducer
