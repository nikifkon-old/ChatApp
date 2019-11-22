import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { ContentGrid, P, H4 } from '../../styles'
import { IconButton } from '../index'
import { Menu, MenuItem } from '@material-ui/core'

const UserInfo = ({username, logoutUser}) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <ContentGrid container
      alignItems="center"
      justify="space-between"
    >
      <P center grid_right>{username}</P>

      <IconButton
        onClick={handleClick}
        icon="keyboard_arrow_down"
        size="small"
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleClose}>
          My Profile
        </MenuItem>
        <MenuItem onClick={logoutUser}>
          Log out
        </MenuItem>
      </Menu>
    </ContentGrid>
  );
}

UserInfo.propTypes = {
  username: PropTypes.string,
  logoutUser: PropTypes.func.isRequired,
};

export default UserInfo;
