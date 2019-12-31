import * as types from './index'

export const getUserProfile = () => {
  return {
    type: types.GET_USER_DATA_REQUEST
  }
}

export const logoutUser = () => {
  return {
    type: types.LOGOUT_CLEAN_UP
  }
}

export const loginJWT = values => {
  return {
    type: types.LOGIN_WITH_JWT_REQUEST,
    payload: values
  }
}

export const singUpUser = values => {
  return {
    type: types.SINGUP_USER_REQUEST,
    payload: values
  }
}
