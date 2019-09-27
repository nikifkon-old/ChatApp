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
        // set messages in default: []
        data: action.payload.map(
          (dialog) => {
            return {
              ...dialog,
              messages: [],
            }
          }
        ),
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
        // set messages in active dialog
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
    case types.PUSH_RECEIVE_MESSAGE_IN_DIALOG: {
      const id = Number(action.payload.dialog)
      return {
        ...state,
        // add new message to dialog with id: `action.payload.dialog`
        data: state.data.map(
          (dialog) => dialog.id === id ? {
            ...dialog,
            messages: [
              ...dialog.messages,
              {
                id: action.payload.id,
                sender: action.payload.sender,
                sender_name: action.payload.sender_name,
                avatar: action.payload.avatar,
                dialog: id,
                text: action.payload.text,
                date: action.payload.date,
              }
            ]
          } : dialog
        )
      }
    }
    case types.DIALOG_CLEAN_UP:
      return {
        ...state,
        ...initialState,
      }
    default:
      return state
  }
}
