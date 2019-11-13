import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ChatList } from '../../components'
import { getWebsocketIsAuth } from '../../selectors/WebsocketSelectors'
import { getGroupList, setActiveGroup } from '../../actions/groupActions'
import { getQueryParams } from '../../selectors/RouterSelectors'
import { selectGroupList, selectGroupInfo } from './selectors'


function GroupList() {
  const dispatch = useDispatch()

  const info = useSelector(state => selectGroupInfo(state))
  const { fetching, error } = info
  const groupList = useSelector(state => selectGroupList(state))

  const websocketIsAuth = useSelector(state => getWebsocketIsAuth(state))
  const filter = useSelector(state => getQueryParams(state, 'filter'))

  useEffect(() => {
    if(websocketIsAuth) {
      dispatch(getGroupList({filter}))
    }
  }, [websocketIsAuth, dispatch, filter])

  return (
    <ChatList
      listProps={{
        list: groupList,
        fetching,
        errorMessage: "You don't have any group.",
        error
      }}
      cardProps={{
        setActive: setActiveGroup
      }}
      getCardData={(data) => {
        return {
          ...data,
          avatar: data.img,
          title: data.name
        }
      }}
    />
  )
}

export default GroupList