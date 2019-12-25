import * as types from '../../actions'

const initialState = {
  fetching: false,
  success: false,
  error: null,
  data: {
    user: null,
    avatar: null,
    tel: null,
    birth: null,
    gender: null,
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_USER_DATA_REQUEST:
    case types.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        fetching: true
      }

    case types.GET_USER_DATA_SUCCESS:
    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        fetching: false,
        success: true,
        error: null,
        data: action.payload
      }

    case types.GET_USER_DATA_FAILURE:
    case types.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    
    case types.USER_DATA_CLEAN_UP:
      return {
        ...state,
        ...initialState,
      }
    default:
      return state
  }
}
