export const selectDialogInfo = state => state.app.dialogs
export const selectDialogData = state => state.app.dialogs.data

export const getActiveId = state => selectDialogInfo(state).active;

export const getDialogById = (state, id) => selectDialogData(state).find(
  dialog => dialog.id === id
)

export const getActiveDialog = state => getDialogById(state, getActiveId(state))

export const getFirstUnread = state => {
  const dialog = getActiveDialog(state)
  if (dialog) {
    const firstUnread = dialog.messages.find(message => message.unread === true)
    if (firstUnread) {
      return firstUnread.id
    }
  }
}
