import React, { useState } from 'react'
import { useSelector } from 'react-redux'
// import PropTypes from 'prop-types'

import { setActiveDialog } from '../../actions/chatActions'
import {
  getDialogsInfo,
  getDialogsList,
  getNotEmptyDialogsData,
} from './selectors'
import { ChatList, Card } from '../../components'

function DialogList() {
  // allow dialogs without messages
  const [allowEmpty, setAllowEmpty] = useState(false);

  function handleAllowEmpty() {
    setAllowEmpty(!allowEmpty)
  }

  // data
  const dialogs = useSelector(state => getDialogsInfo(state));
  const { success, error } = dialogs;
  const data = useSelector(state => {
    if (allowEmpty) {
      return getDialogsList(state)
    } else {
      return getNotEmptyDialogsData(state)
    }
  });

  return (
    <ChatList
      data={data}
      success={success}
      error={error}
      handleAllowEmpty={handleAllowEmpty}
      card={({data}) => {
        data = {
          ...data,
          avatar: data.interlocutor.avatar,
          title: data.interlocutor.user,
        }
        return (
          <Card
            data={data}
            setActive={setActiveDialog}
          />
        )
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
