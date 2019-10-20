import { createSelector } from 'reselect'

export const getDialogsInfo = state => state.app.dialogs

export const getDialogsList = createSelector(
  [ getDialogsInfo ],
  dialogs => dialogs.data
)

export const getNotEmptyDialogsData = createSelector(
  [ getDialogsList ],
  dialogs => dialogs.filter(dialog => dialog.last_message.sender !== null)
)
