import * as types from '../../actions'

const initialState = {
  connecting: false,
  authenticated: false,
  error: null,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.WEBSOCKET_CONNECT_REQUEST:
      return {
        ...state,
        connecting: true,
      }
    case types.WEBSOCKET_CONNECT_SUCCESS:
      return {
        ...state,
        connecting: false,
        authenticated: true,
        error: null,
      }
    case types.WEBSOCKET_CONNECT_FAILURE:
      return {
        ...state,
        connecting: false,
        error: action.payload
      }
    case types.WEBSOCKET_CLEAN_UP:
      return {
        ...state,
        ...initialState,
      }
    default:
      return state
  }
}
