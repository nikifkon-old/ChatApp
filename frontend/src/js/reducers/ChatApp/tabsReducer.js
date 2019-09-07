import * as types from '../../actions'

const initialState = {
  activeTab: 1
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.HANDLE_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload
      }
    default:
      return state
  }
}
