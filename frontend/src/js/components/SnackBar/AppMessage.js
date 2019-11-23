import React from 'react'
import { Snackbar } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import { getNotification } from '../../selectors/AppSelectors'
import { P } from '../../styles'
import { IconButton } from '../index'
import { clearNotification } from '../../actions/chatActions'

function AppMessage() {
  const dispatch = useDispatch()
  const notification = useSelector(state => getNotification(state))

  const handleClose = () => {
    dispatch(clearNotification())
  }

  return (
    <Snackbar
      open={Boolean(notification)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      message={
        <P>{notification}</P>
      }
      action={[
        <IconButton
          key="close"
          icon="close"
          onClick={handleClose}
        />
      ]}
    />
  )
}

export default AppMessage
