import * as types from '../../actions'

const initialState = {
  isOpen: true
}

export const getHeaderStatus = state => state.isOpen

export default function(state = initialState, action) {
  switch (action.type) {
    case types.HANDLE_APP_HEADER:
      return {
        ...state,
        isOpen: !getHeaderStatus(state)
      }
    default:
      return state
  }
}
