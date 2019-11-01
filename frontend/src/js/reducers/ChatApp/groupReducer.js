import * as types from '../../actions'
import {
  setDataToOne,
  pushMessage,
  deleteMessage,
  updateMessage,
  setAsRead,
  pushChat,
  setData,
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
    case types.SET_GROUPS_DATA: {
      return setData(state, action.payload)
   }

    case types.GET_GROUPS_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    
    case types.SET_GROUP_DATA: {
      return setDataToOne(state, action.payload)
    }

    case types.SET_ACTIVE_GROUP:
      return {
        ...state,
        active: action.payload
      }

    case types.PUSH_RECEIVE_MESSAGE_IN_GROUP: {
      return pushMessage(state, action.payload)
    }

    case types.DELETE_GROUP_MESSAGE: {
      return deleteMessage(state, action.payload)
    }

    case types.UPDATE_GROUP_MESSAGE: {
      return updateMessage(state, action.payload)
    }

    case types.PUSH_NEW_GROUP: {
      return pushChat(state, action.payload)
    }

    case types.SET_AS_READ_GROUP_MESSAGE: {
      return setAsRead(state, action.payload)
    }

    case types.GROUP_CLEAN_UP:
      return {
        ...initialState,
      }

    default:
      return state
  }
}