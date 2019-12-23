import * as types from '../../actions'

const initialState = {
  fetching: false,
  error: null,
  data: null 
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_PROFILE_REQUEST:
      return {
        ...state,
        fetching: true,
      }
    
    case types.GET_PROFILE_SUCCESS:
      return {
        ...state,
        fetching: false,
        data: action.payload
      }
    
    case types.GET_PROFILE_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    default:
      return state
  }
}