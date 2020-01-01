import React, { useState } from 'react'
import { useSelector } from 'react-redux'
// import PropTypes from 'prop-types'

import { setActiveDialog, searchDialogs } from '../../actions/dialogActions'
import {
  selectDialogInfo,
  getNotEmptyDialogsData,
  getDialogsWithFilters
} from '../../selectors/DialogSelectors'
import { ChatList } from '../../components'
import { useAction } from '../../hooks'
import { getActiveId } from '../../selectors/DialogSelectors'

function DialogList() {
  // allow dialogs without messages
  const [allowEmpty, setAllowEmpty] = useState(true);

  function handleAllowEmpty() {
    setAllowEmpty(!allowEmpty)
  }

  // data
  const dialogsInfo = useSelector(state => selectDialogInfo(state));
  const { fetching, error } = dialogsInfo
  const dialogs = useSelector(state => {
    if (allowEmpty) {
      return getDialogsWithFilters(state)
    } else {
      return getNotEmptyDialogsData(state)
    }
  });
  const activeId = useSelector(state => getActiveId(state))

  const search = useAction(searchDialogs)

  return (
    <ChatList
      listProps={{
        list: dialogs,
        fetching,
        errorMessage: "You don't have any dialogs.",
        error
      }}
      searchBarProps={{
        search
      }}
      additionalBtnProps={{
        handler: handleAllowEmpty
      }}
      cardProps={{
        setActive: setActiveDialog
      }}
      getCardData={(data) => {
        return {
          ...data,
          avatar: data.interlocutor.avatar,
          title: data.interlocutor.user,
          isActive: data.id == activeId
        }
      }}
    />
  )
}

// DialogList.propTypes = {
//   data: PropTypes.array.isRequired,
//   success: PropTypes.bool.isRequired,
//   fetching: PropTypes.bool.isRequired,
//   error: PropTypes.string,
//   getDialogDetails: PropTypes.func.isRequired,
// };

export default DialogList;
