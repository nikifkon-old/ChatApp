export const getIsSuccessUserData = state => state.auth.user.success
export const getIsSuccessDialogs = state => state.app.dialogs.success

export const getDialogs = state => state.app.dialogs

export const getActiveDialog = state => {
  const activeId = state.app.dialogs.active
  const data = getDialogs(state).data

  return data.find(dialog => dialog.id === activeId)
}
