import React from 'react'
import PropTypes from 'prop-types'

import { ContentGrid, P } from '../../../styles'
import { IconButton } from '../../index'
import { withAccountInfo } from '../../../HOC'

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
          <IconButton
            icon="keyboard_arrow_down"
            size="small"
          />
        </ContentGrid>
    )
}

UserInfo.propTypes = {
  username: PropTypes.string,
  logoutUser: PropTypes.func.isRequired,
}

export default withAccountInfo(UserInfo)
