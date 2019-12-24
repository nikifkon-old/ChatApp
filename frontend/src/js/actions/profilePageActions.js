import * as types from './index'

export const getProfile = ({id}) => {
  return {
    type: types.GET_PROFILE_REQUEST,
    payload: {
      id
    }
  }
}

export const updateProfile = ({user_id, data}) => {
  return {
    type: types.UPDATE_PROFILE_REQUEST,
    payload: {
      user_id,
      data
    }
  }
}
