import React from 'react'
import PropTypes from 'prop-types'

import ChatInfo from './ChatInfo'
import AccountInfo from './AccountInfo'
import ColoredLine from '../ColoredLine'
import { StyledInfoPanel } from './styles'

const InfoPanel = ({username}) => {
    return (
        <StyledInfoPanel>
          <AccountInfo username={username} />
          <ColoredLine />
          <ChatInfo />
        </StyledInfoPanel>
    )
}


InfoPanel.propTypes = {
  username: PropTypes.string.isRequired
}


export default InfoPanel