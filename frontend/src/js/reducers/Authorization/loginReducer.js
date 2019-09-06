import * as types from '../../actions'

const initialState = {
  fetching: false,
  success: false,
  error: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_WITH_JWT_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case types.LOGIN_WITH_JWT_SUCCESS:
      return {
        ...state,
        fetching: false,
        success: true,
        error: null,
      }
    case types.LOGIN_WITH_JWT_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    default:
      return state
  }
}
