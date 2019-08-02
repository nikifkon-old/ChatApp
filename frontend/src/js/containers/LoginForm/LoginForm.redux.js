import { createSlice } from 'redux-starter-kit'
import axios from 'axios'

import { AuthActions } from '../Auth/Auth.redux'

const URL = 'http://127.0.0.1:8000'

const LoginSlice = createSlice({
  slice: "@login",
  initialState: {
    user: {
      name: null
    },
    ui: {
      requestStatus: null,
    }
  },
  reducers: {
    setUi: (state, action) => {
      state.ui.requestStatus = action.payload.status
    },
    setUserData: (state, action) => {
      state.user = {
        name: action.payload.username
      }
    }
  }
})

const { actions: LoginActions, reducer } = LoginSlice

// Login user via token
// data = {"username": "", password: ""}
const LoginUser = (data, history) => dispatch => {
  axios.post(`${URL}/auth/token/login/`, data)
  .then((response) => {
    const token = response.data.auth_token
    localStorage.setItem('user', token)
    dispatch(AuthActions.setAuth(true))

    // redirect to /app
    history.push('/app')

    const status = response.status
    dispatch(LoginActions.setUi({status}))
    
    const username = data.username
    dispatch(LoginActions.setUserData({username}))
    localStorage.setItem('username', username)
  })
  .catch((error) => {
    console.log(error)
    const status = error.response.status

    dispatch(LoginActions.setUi({
      status
    }))
  })
}

const actions = {
  LoginUser,
}

export {
  reducer as default,
  actions,
}