import * as types from './index'
import * as events from './websocketEvents'

export const setActiveDialog = (id) => {
  return {
    type: types.SET_ACTIVE_DIALOG,
    payload: id
  }
}

export const getDialogData = ({filter}) => {
  return {
    type: types.WEBSOCKET_SEND_REQUEST,
    payload: {
      event: events.DIALOGS_LIST,
      data: {
        filter,
      }
    }
  }
}

export const getDialogDetails = dialog_id => {
  return {
    type: types.WEBSOCKET_SEND_REQUEST,
    payload: {
      event: events.DIALOG_GET,
      data: {
        id: dialog_id,
      }
    }
  }
}

export const sendMessageInDialog = ({id, text}) => {
  return {
    type: types.WEBSOCKET_SEND_REQUEST,
    payload: {
      event: events.DIALOG_SEND,
      data: {
        id,
        text,
      }
    }
  }
}

export const deleteMessageInDialog = ({id}) => {
  return {
    type: types.WEBSOCKET_SEND_REQUEST,
    payload: {
      event: events.DIALOG_DELETE_MESSAGE,
      data: {
        id,
      }
    }
  }
}

export const updateMessageInDialog = ({id, text, stared, unread}) => {
  return {
    type: types.WEBSOCKET_SEND_REQUEST,
    payload: {
      event: events.DIALOG_UPDATE_MESSAGE,
      data: {
        id,
        text,
        stared,
        unread,
      }
    }
  }
}

export const createDialog = ({person_id}) => {
  return {
    type: types.WEBSOCKET_SEND_REQUEST,
    payload: {
      event: events.DIALOG_CREATE,
      data: {
        id: person_id,
      }
    }
  }
}

export const setAsReadDialogMessage = ({chat_id, message_id}) => {
  return {
    type: types.SET_AS_READ_DIALOG_MESSAGE,
    payload: {
      chat_id, message_id
    }
  }
}