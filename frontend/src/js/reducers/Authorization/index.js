import { combineReducers } from 'redux'

import userReducer from './userReducer'
import loginReducer from './loginReducer'
import singUpReducer from './singUpReducer'
import authReducer from './authReducer'

const AuthReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  login: loginReducer,
  singup: singUpReducer,
})

export default AuthReducer
