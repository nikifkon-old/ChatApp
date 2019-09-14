import React from 'react'

import ChatInfo from './ChatInfo'
import AccountInfo from './AccountInfo'
import { ColoredLine } from '..'
import { StyledInfoPanel } from './styles'

const InfoPanel = () => {
    return (
        <StyledInfoPanel>
          <AccountInfo />
          <ColoredLine />
          <ChatInfo />
        </StyledInfoPanel>
    )
}

export default InfoPanel
