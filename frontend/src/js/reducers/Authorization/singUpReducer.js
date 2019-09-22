import * as types from '../../actions'

const initialState = {
  fetching: false,
  success: false,
  error: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SINGUP_USER_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case types.SINGUP_USER_SUCCESS:
      return {
        ...state,
        fetching: false,
        success: true,
        error: null,
      }
    case types.SINGUP_USER_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    case types.SINGUP_CLEAN_UP:
      return {
        ...state,
        ...initialState,
      }
    default:
      return state
  }
}
