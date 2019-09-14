import React from 'react'
import PropTypes from 'prop-types'

import { ContentGrid, P, IconBtn } from '../../../styles'
import { withAccountInfo } from '../../../HOC'

const UserInfo = ({username, logoutUser}) => {
    return (
        <ContentGrid container
          alignItems="center"
          justify="space-between"
        >
          <IconBtn onClick={logoutUser} size="small">
            <i className="material-icons">
              notifications
            </i>
          </IconBtn>
          <P center grid_right>{username}</P>
          <IconBtn size="small">
            <i className="material-icons">
              keyboard_arrow_down
            </i>
          </IconBtn>
        </ContentGrid>
    )
}

UserInfo.propTypes = {
  username: PropTypes.string,
  logoutUser: PropTypes.func.isRequired,
}

export default withAccountInfo(UserInfo)
