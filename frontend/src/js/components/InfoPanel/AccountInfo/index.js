import React from 'react'
import PropTypes from 'prop-types'
import { Grid, IconButton } from '@material-ui/core'

import { P } from '../../../styles'

const UserInfo = ({username, logout}) => {
    return (
        <Grid container
          alignItems="center"
          justify="space-between"
        >
          <IconButton onClick={logout} size="small">
            <i className="material-icons">
              notifications
            </i>
          </IconButton>
          <P center grid_right>{username}</P>
          <IconButton size="small">
            <i className="material-icons">
              keyboard_arrow_down
            </i>
          </IconButton>
        </Grid>
    )
}

UserInfo.propTypes = {
  username: PropTypes.string,
  logout: PropTypes.func.isRequired,
}

export default UserInfo