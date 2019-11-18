import * as types from '../../actions'
import {
  setDataToOne,
  pushMessage,
  deleteMessage,
  updateMessage,
  setAsRead,
  pushChat,
  setData,
  popChat,
} from './messageReducerShortcuts'

const initialState = {
  fetching: true,
  error: null,
  success: false,
  active: null,
  data: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SET_DIALOGS_DATA: {
      return setData(state, action.payload)
    }

    case types.GET_DIALOGS_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    
    case types.SET_DIALOG_DATA: {
      return setDataToOne(state, action.payload)
    }

    case types.SET_ACTIVE_DIALOG:
      return {
        ...state,
        active: action.payload
      }

    case types.PUSH_RECEIVE_MESSAGE_IN_DIALOG: {
      return pushMessage(state, action.payload)
    }

    case types.DELETE_DIALOG_MESSAGE: {
      return deleteMessage(state, action.payload)
    }

    case types.UPDATE_DIALOG_MESSAGE: {
      return updateMessage(state, action.payload)
    }

    case types.PUSH_NEW_DIALOG: {
      return pushChat(state, action.payload)
    }

    case types.POP_DIALOG:
      return popChat(state, action.payload)

    case types.SET_AS_READ_DIALOG_MESSAGE: {
      return setAsRead(state, action.payload)
    }

    case types.DIALOG_CLEAN_UP:
      return {
        ...initialState,
      }

    default:
      return state
  }
}
