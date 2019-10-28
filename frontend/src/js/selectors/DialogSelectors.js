export const getActiveDialogId = state => state.app.dialogs.active;

export const getDialogs = state => state.app.dialogs

export const getDialog = (state, id) => state.app.dialogs.data.find(
  dialog => dialog.id === id
);

export const getFirstUnread = state => {
  const id = getActiveDialogId(state)
  const dialog = getDialog(state, id)
  const firstUnread = dialog.messages.find(message => message.unread === true)
  if (firstUnread) {
    return firstUnread.id
  }
}
