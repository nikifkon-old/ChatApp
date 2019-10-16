import * as types from '../../actions'

const initialState = {
  isOpen: true
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.HANDLE_APP_HEADER:
      return {
        ...state,
        isOpen: !state.isOpen
      }
    default:
      return state
  }
}
