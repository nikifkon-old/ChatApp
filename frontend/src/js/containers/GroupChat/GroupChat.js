import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Chat } from '../../components'
import {
  sendMessageInGroup,
  setAsReadGroupMessage,
  updateMessageInGroup,
  deleteMessageInGroup,
  getGroupDetails
} from '../../actions/groupActions'
import { getQueryParams } from '../../selectors/RouterSelectors'
import { getActiveGroup, selectGroupInfo } from '../../selectors/GroupSelectors'
import { useAction } from '../../utils'

function GroupChat() {
  const dispatch = useDispatch()

  const group = useSelector(state => getActiveGroup(state))
  const title = group && group.name
  const id = group && group.id
  const { fetching, success, error } = useSelector(state => selectGroupInfo(state))

  const filter = useSelector(state => getQueryParams(state, 'filter'))

  useEffect(() => {
    if (group &&
      !group.fetched &&
      filter !== 'stared'
    ) {
      dispatch(getGroupDetails(group.id))
    }
  }, [group, dispatch, filter])

  const sendMessage = useAction(sendMessageInGroup)
  const updateMessage = useAction(updateMessageInGroup)
  const deleteMessage = useAction(deleteMessageInGroup)
  const setAsRead = useAction(setAsReadGroupMessage)

  return (
    <Chat
      logProps={{
        data: group,
        fetching,
        success,
        error
      }}
      topPanelProps={{
        title
      }}
      inputProps={{
        sendMessage,
        id
      }}
      messageProps={{
        setAsRead,
        updateMessage,
        deleteMessage
      }}
    />
  )
}

export default GroupChat