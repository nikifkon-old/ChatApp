import * as types from './index'

export const getProfile = ({id}) => {
  return {
    type: types.GET_PROFILE_REQUEST,
    payload: {
      id
    }
  }
}
