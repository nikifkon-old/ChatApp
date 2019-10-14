import React from 'react'
import PropTypes from 'prop-types'

import { ContentGrid, P, H4 } from '../../styles'
import { IconButton, Popover } from '../index'

const UserInfo = ({username, logoutUser}) => {
  return (
    <ContentGrid container
      alignItems="center"
      justify="space-between"
    >
      <IconButton
        icon="notifications"
        onClick={logoutUser}
        size="small"
      />
      <P center grid_right>{username}</P>

      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        button={
          ({handleClick}) => (
            <IconButton
              onClick={handleClick}
              icon="keyboard_arrow_down"
              size="small"
            />
          )
        }
        modal={() => (
          <ContentGrid
            container
            direction="column"
            alignItems="center"
          >
            <H4>My profile</H4>
            <P>data</P>
          </ContentGrid>
        )}
      />
    </ContentGrid>
  );
}

UserInfo.propTypes = {
  username: PropTypes.string,
  logoutUser: PropTypes.func.isRequired,
};

export default UserInfo;
