import * as types from './index'
import * as events from './websocketEvents'

export const handleAppHeader = () => {
  return {
    type: types.HANDLE_APP_HEADER
  }
}

export const getDialogs = () => {
  return {
    type: types.GET_DIALOGS_REQUEST
  }
}

export const getDialogDetails = dialog_id => {
  return {
    type: types.GET_DIALOG_DETAILS_REQUEST,
    payload: dialog_id,
  }
}

export const connectToWebSocket = () => {
  return {
    type: types.WEBSOCKET_CONNECT_REQUEST
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

export const updateMessageInDialog = ({id, text}) => {
  return {
    type: types.WEBSOCKET_SEND_REQUEST,
    payload: {
      event: events.DIALOG_UPDATE_MESSAGE,
      data: {
        id,
        text,
      }
    }
  }
}

export const createDialog = ({id}) => {
  return {
    type: types.WEBSOCKET_SEND_REQUEST,
    payload: {
      event: events.DIALOG_CREATE,
      data: {
        id,
      }
    }
  }
}
