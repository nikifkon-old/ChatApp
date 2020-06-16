import { createSelector } from 'reselect'

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

export const getUnreadCount = state => {
  const data = selectDialogData(state)
  return data.reduce((total, el) => total + (el.unread_count > 0), 0)
}

export const getNotEmptyDialogsData = createSelector(
  [ selectDialogData ],
  dialogs => dialogs.filter(dialog => dialog.last_message.sender !== null)
)

export const getDialogFilter = state => selectDialogInfo(state).filters

export const getDialogsWithFilters = state => {
  const data = selectDialogData(state)
  const filter = getDialogFilter(state)
  
  if (!filter.name) {
    return data
  }
  return data.filter(dialog =>
    dialog.interlocutor.username.toLowerCase().indexOf(filter.name.toLowerCase()) != -1
  )
}