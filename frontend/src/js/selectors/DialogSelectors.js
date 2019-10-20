export const getActiveDialog = state => state.app.dialogs.active

export const getDialog = (state, id) => state.app.dialogs.data.find(
  dialog => dialog.id === id
)
