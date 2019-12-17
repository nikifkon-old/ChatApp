import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { ContentGrid, P} from '../../styles'
import { IconButton } from '../index'
import { Menu, MenuItem, Link } from '@material-ui/core'

const UserInfo = ({username, userId, logout}) => {
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
        <MenuItem>
          <Link href={`/app/profile/${userId}`}> {/* fix me */}
            My Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={logout}>
          Log out
        </MenuItem>
      </Menu>
    </ContentGrid>
  );
}

UserInfo.propTypes = {
  username: PropTypes.string,
  userId: PropTypes.number,
  logout: PropTypes.func.isRequired
};

export default UserInfo;
