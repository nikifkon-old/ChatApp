import { createSlice } from 'redux-starter-kit'
import axios from 'axios'

import { actions as LoginActions } from '../LoginForm/LoginForm.redux'

const URL = "http://localhost:8000"

const SingUpSlice = createSlice({
  slice: "@SingUp",
  initialState: {
    ui: {
      requestStatus: null
    }
  },
  reducers: {
    setUI: (state, action) => {
      state.ui.requestStatus = action.payload
    }
  }
})

const { actions: SingUpActions, reducer } = SingUpSlice

const SingUpUser = (values, history) => dispatch => {
  axios.post(`${URL}/auth/users/`, values)
  .then((response) => {
    dispatch(SingUpActions.setUI(response.status))
    dispatch(LoginActions.LoginUser(values, history))
  })
  .catch((error) => {
    dispatch(SingUpActions.setUI(error.response.status))
  })
}

const actions = {
  SingUpUser
}

export {
  reducer as default,
  actions
}