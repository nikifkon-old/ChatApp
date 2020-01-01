import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ChatList } from '../../components'
import { getWebsocketIsAuth } from '../../selectors/WebsocketSelectors'
import { getGroupList, setActiveGroup, searchGroups } from '../../actions/groupActions'
import { getQueryParams } from '../../selectors/RouterSelectors'
import { useAction } from '../../hooks'
import { selectGroupInfo, getActiveId, getGroupsWithFilters } from '../../selectors/GroupSelectors'


function GroupList() {
  const dispatch = useDispatch()

  const info = useSelector(state => selectGroupInfo(state))
  const { fetching, error } = info
  const groupList = useSelector(state => getGroupsWithFilters(state))
  const activeId = useSelector(state => getActiveId(state))

  const websocketIsAuth = useSelector(state => getWebsocketIsAuth(state))
  const filter = useSelector(state => getQueryParams(state, 'filter'))

  useEffect(() => {
    if(websocketIsAuth) {
      dispatch(getGroupList({filter}))
    }
  }, [websocketIsAuth, dispatch, filter])

  const search = useAction(searchGroups)

  return (
    <ChatList
      listProps={{
        list: groupList,
        fetching,
        errorMessage: "You don't have any group.",
        error
      }}
      searchBarProps={{
        search
      }}
      cardProps={{
        setActive: setActiveGroup
      }}
      getCardData={(data) => {
        return {
          ...data,
          avatar: data.img,
          title: data.name,
          isActive: data.id == activeId
        }
      }}
    />
  )
}

export default GroupList