export const selectGroupInfo = state => state.app.groups
export const selectGroupList = state => state.app.groups.data

export const getActiveId = state => selectGroupInfo(state).active

export const getGroupById = (state, id) => {
  return selectGroupList(state).find(
    group => group.id = id
  )
}

export const getActiveGroup = state => getGroupById(state, getActiveId(state))