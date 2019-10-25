export const getActiveDialog = state => state.app.dialogs.active;

export const getDialog = (state, id) => state.app.dialogs.data.find(
  dialog => dialog.id === id
);

export const getIdOfFirstUnreadMessageInActiveDialog = state => {
  const id = getActiveDialog(state)
  const dialog = getDialog(state, id)
  const firstUnread = dialog.messages.find(message => message.unread === true)
  if (firstUnread) {
    return firstUnread.id
  }
}
