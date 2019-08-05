import React from 'react'
import { IconButton } from '@material-ui/core'
import PropTypes from 'prop-types'

import { StylesChatMenu } from './styles'

const ChatMenu = ({HandleHeader}) => {
    const handleMenu = () => {
      HandleHeader()
    }

    return (
        <StylesChatMenu>
          <IconButton onClick={handleMenu}>
            <i className="material-icons light">
              menu
            </i>
          </IconButton>
        </StylesChatMenu>
    )
}

ChatMenu.propTypes = {
  HandleHeader: PropTypes.func.isRequired
}

export default ChatMenu