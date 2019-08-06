import React from 'react'
import { IconButton } from '@material-ui/core'
import PropTypes from 'prop-types'

import { StylesChatNav } from './styles'

const ChatNav = ({HandleHeader}) => {
    const handleMenu = () => {
      HandleHeader()
    }

    return (
        <StylesChatNav>
          <IconButton onClick={handleMenu}>
            <i className="material-icons light">
              menu
            </i>
          </IconButton>
        </StylesChatNav>
    )
}

ChatNav.propTypes = {
  HandleHeader: PropTypes.func.isRequired
}

export default ChatNav