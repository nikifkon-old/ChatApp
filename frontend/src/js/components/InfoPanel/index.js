import React from 'react'
import PropTypes from 'prop-types'

import ChatInfo from './ChatInfo'
import AccountInfo from './AccountInfo'
import { ColoredLine } from '..'
import { StyledInfoPanel } from './styles'

const InfoPanel = ({username, logout}) => {
    return (
        <StyledInfoPanel>
          <AccountInfo logout={logout} username={username} />
          <ColoredLine />
          <ChatInfo />
        </StyledInfoPanel>
    )
}

InfoPanel.propTypes = {
  username: PropTypes.string,
  logout: PropTypes.func.isRequired,
}

export default InfoPanel
