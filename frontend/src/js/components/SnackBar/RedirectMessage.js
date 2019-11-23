import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Snackbar } from '@material-ui/core'

import { IconButton } from '../index'
import { getRouterState } from '../../selectors/RouterSelectors'
import { resetRouterState } from '../../actions/routerActions'
import { P } from '../../styles'

function RedirectMessage() {
  const dispatch = useDispatch()

  const routerState = useSelector(state => getRouterState(state))
  const message = routerState && routerState.redirect && routerState.redirect.message

  const handleClose = () => {
    dispatch(resetRouterState())
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={Boolean(message)}
      message={
        <P>{message}</P>
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

export default RedirectMessage 
