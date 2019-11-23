import * as types from '../../actions'

const initialState = {
  message: null 
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.PUSH_NOTIFICATION:
      return {
        ...state,
        message: action.payload
      }
    
    case types.CLEAR_NOTIFICATION:
      return initialState

    default:
      return state
  }
}

