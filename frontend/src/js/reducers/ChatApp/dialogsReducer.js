import * as types from '../../actions'
import * as events from '../../actions/websocketEvents'

const initialState = {
  fetching: false,
  success: false,
  error: null,
  messages_fetching: false,
  messages_success: false,
  messages_error: null,
  active: null,
  data: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.WEBSOCKET_SEND_REQUEST:
      if (action.payload.event === events.DIALOGS_LIST) {
        return {
          ...state,
          fetching: true,
          active: null,
        }
      } else {
        return state
      }
    case types.SET_DIALOGS_DATA: {
      const sorted_data = action.payload.sort(
        (first, second) => second.unread_count - first.unread_count
      )
      return {
        ...state,
        fetching: false,
        success: true,
        error: null,
        data: sorted_data,
        active: sorted_data[0] && sorted_data[0].id
      }
    }
    case types.SET_DIALOG_DATA: {
      const id = action.payload.id
      return {
        ...state,
        data: state.data.map(
          dialog => dialog.id === id
            ? {
                ...action.payload,
                fetched: true
              }
            : {
                ...dialog,
                fetched: true
              }
        )
      }
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

    case types.PUSH_RECEIVE_MESSAGE_IN_DIALOG: {
      const dialog_id = Number(action.payload.dialog)
      const { sender, text, date } = action.payload
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
                ...action.payload
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
                ...action.payload,
              }
              : message
            )
          }
          : dialog
        )
      }
    }

    case types.SET_AS_READ: {
      const { dialog_id, message_id } = action.payload
      return {
        ...state,
        data: state.data.map(
          dialog => dialog.id === dialog_id
            ? {
              ...dialog,
              unread_count: dialog.unread_count - 1,
              messages: dialog.messages.map(
                message => message.id === message_id
                  ? {
                    ...message,
                    unread: false,
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
