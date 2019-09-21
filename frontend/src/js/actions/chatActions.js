import * as types from './index'

export const handleAppHeader = () => {
  return {
    type: types.HANDLE_APP_HEADER
  }
}

export const handleActiveTabs = id => {
  return {
    type: types.HANDLE_ACTIVE_TAB,
    payload: id
  }
}

export const getDialogs = () => {
  return {
    type: types.GET_DIALOGS_REQUEST
  }
}

export const setActiveDialog = dialog_id => {
  return {
    type: types.GET_MESSAGES_IN_DIALOG_REQUEST,
    payload: dialog_id
  }
}

export const sendMessage = text => {
  return {
    type: types.SEND_MESSAGE,
    payload: text
  }
}

export const insertNewMessage = data => {
  return {
    type: types.ADD_NEW_MESSAGE,
    payload: data
  }
}