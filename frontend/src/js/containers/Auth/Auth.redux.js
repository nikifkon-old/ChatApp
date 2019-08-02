import { createSlice } from 'redux-starter-kit'
import axios from 'axios'

const URL = 'http://127.0.0.1:8000'

// Get Authorization headers 
const get_auth_headers = () => {
  let auth_token = localStorage.getItem('user')
  return { 
    headers: { 
      "Authorization": `Token ${auth_token}`
    }
  }
}

const AuthSlice = createSlice({
  slice: "@auth",
  initialState: {
    isAuth: false,
  },
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload
    }
  }
})

const { actions: AuthActions, reducer } = AuthSlice

// Logout User
const LogoutUser = () => dispatch => {
  axios.post(`${URL}/auth/token/logout`, {}, get_auth_headers())
  .then((response) => {
    dispatch(AuthActions.setAuth(false))
    localStorage.removeItem('user')
  })
  .catch((error) => {
    console.log(error)
  })
}

const actions = {
  LogoutUser
}

export {
  reducer as default,
  get_auth_headers,
  AuthActions,
  actions
}