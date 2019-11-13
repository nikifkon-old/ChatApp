import * as types from './index'
import * as events from './websocketEvents'


export const setActiveGroup = (id) => {
  return {
    type: types.SET_ACTIVE_GROUP,
    payload: id
  }
}

export const getGroupList = ({filter}) => {
  return {
    type: types.WEBSOCKET_SEND_REQUEST,
    payload: {
      event: events.GROUPS_LIST,
      data: {
        filter
      }
    }
  }
}