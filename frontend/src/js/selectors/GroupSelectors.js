export const selectGroupInfo = state => state.app.groups
export const selectGroupList = state => state.app.groups.data

export const getActiveId = state => selectGroupInfo(state).active

export const getGroupById = (state, id) => {
  return selectGroupList(state).find(
    group => group.id === id
  )
}

export const getActiveGroup = state => getGroupById(state, getActiveId(state))

export const getFirstUnread = state => {
  const group = getActiveGroup(state)
  if (group) {
    const firstUnread = group.messages.find(message => message.unread === true)
    if (firstUnread) {
      return firstUnread.id
    }
  }
}

export const getUnreadCount = state => {
  const data = selectGroupList(state)
  return data.reduce((total, el) => (total + el.unread_count > 0), 0)
}