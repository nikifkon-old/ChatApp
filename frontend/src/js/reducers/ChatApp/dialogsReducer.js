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
      const dialog_id = Number(action.payload.dialog)
      const { id, sender, sender_name, avatar, text, date } = action.payload
      return {
        ...state,
        // add new message to dialog with id: `action.payload.dialog`
        data: state.data.map(
          (dialog) => dialog.id === dialog_id ? {
            ...dialog,
            last_message: {
              sender,
              text,
              date,
            },
            messages: [
              ...dialog.messages,
              {
                id,
                sender,
                sender_name,
                avatar,
                dialog: dialog_id,
                text,
                date
              }
            ]
          } : dialog
        )
      }
    }
    case types.DELETE_DIALOG_MESSAGE: {
      const dialog_id = Number(action.payload.dialog_id)
      const message_id = Number(action.payload.message_id)

      return {
        ...state,
        data: state.data.map(
          dialog => dialog.id === dialog_id
          ? {
            ...dialog,
            messages: dialog.messages.filter(
              message => message.id !== message_id
            )
          }
          : dialog
        )
      }
    }

    case types.UPDATE_DIALOG_MESSAGE: {
      const dialog_id = Number(action.payload.dialog)
      const message_id = Number(action.payload.id)
      const new_text = action.payload.text
      return {
        ...state,
        data: state.data.map(
          dialog => dialog.id === dialog_id ?
          {
            ...dialog,
            messages: dialog.messages.map(
              message => message.id === message_id ?
              {
                ...message,
                text: new_text
              }
              : message
            )
          }
          : dialog
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
