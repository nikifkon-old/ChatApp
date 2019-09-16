export const getIsSuccessUserData = state => state.auth.user.success
export const getIsSuccessDialogs = state => state.app.dialogs.success

export const getUserId = state => state.auth.auth.user_id
export const getUserInfo = state => state.auth.user.data

export const getDialogs = state => state.app.dialogs

export const getActiveDialogId = state => state.app.dialogs.active
export const getActiveDialog = state => {
  const activeId = getActiveDialogId(state)
  const data = getDialogs(state).data

  return data.find(dialog => dialog.id === activeId)
}
