import { combineReducers } from 'redux'

import uiReducer from './uiReducer'
import LoginFormReducer from './LoginForm/LoginForm.redux'
import AuthReducer from './Auth/Auth.redux'
import SingUpReducer from './SingUpForm/SingUpForm.redux'

const rootReducer = combineReducers({
  login: LoginFormReducer,
  auth: AuthReducer,
  singup: SingUpReducer,
  ui: uiReducer,
})

export default rootReducer