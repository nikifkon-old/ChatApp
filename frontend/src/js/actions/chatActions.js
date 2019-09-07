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
