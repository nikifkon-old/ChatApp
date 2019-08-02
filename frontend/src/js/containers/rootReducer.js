import { combineReducers } from 'redux'
import LoginFormReducer from './LoginForm/LoginForm.redux'
import AuthReducer from './Auth/Auth.redux'

const rootReducer = combineReducers({
  login: LoginFormReducer,
  auth: AuthReducer,
})

export default rootReducer