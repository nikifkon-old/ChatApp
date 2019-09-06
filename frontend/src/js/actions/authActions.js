import * as types from './index'

export const getUserProfile = () => {
  return {
    type: types.GET_USER_DATA_REQUEST
  }
}

export const logoutUser = () => {
  return {
    type: types.LOGOUT_USER
  }
}
