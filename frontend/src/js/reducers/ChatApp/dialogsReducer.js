import * as types from '../../actions'

const initialState = {
  fetching: false,
  success: false,
  error: null,
  messages_fetching: false,
  messages_success: false,
  messages_error: null,
  active: 1,
  data: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.GET_DIALOGS_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case types.GET_DIALOGS_SUCCESS:
      return {
        ...state,
        fetching: false,
        success: true,
        error: null,
        data: action.payload
      }
    case types.GET_DIALOGS_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload
      }

    case types.SET_ACTIVE_DIALOG:
      return {
        ...state,
        active: action.payload
      }

    case types.GET_MESSAGES_IN_DIALOG_REQUEST:
      return {
        ...state,
        messages_fetching: true
      }
    case types.GET_MESSAGES_IN_DIALOG_SUCCESS:
      return {
        ...state,
        messages_fetching: false,
        messages_success: true,
        messages_error: null,
        data: state.data.map(
          (dialog) => dialog.id === action.payload.dialog_id ? {
            ...dialog,
            messages: action.payload.data
          }
          : dialog
        )
      }
    case types.GET_MESSAGES_IN_DIALOG_FAILURE:
      return {
        ...state,
        messages_fetching: false,
        messages_error: action.payload.error
      }
    default:
      return state
  }
}
