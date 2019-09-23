import React from 'react'

import ChatInfo from './ChatInfo'
import AccountInfo from './AccountInfo'
import { ColoredLine } from '../index'
import { StyledInfoPanel } from './styles'
import { dark_cont1 } from '../../styles'

const InfoPanel = () => {
    return (
        <StyledInfoPanel>
          <AccountInfo />
          <ColoredLine color={dark_cont1} />
          <ChatInfo />
        </StyledInfoPanel>
    )
}

export default InfoPanel
