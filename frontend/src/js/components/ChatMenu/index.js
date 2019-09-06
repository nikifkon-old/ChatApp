import React from 'react'

import { H1, dark_cont1 } from '../../styles'
import { StyledChatMenu } from './styles'
import MenuRow from './MenuRow'
import { ColoredLine } from '..'

const ChatMenu = () => {
    return (
        <StyledChatMenu>
          <H1>Inbox</H1>
          <ColoredLine 
            color={dark_cont1}
            height="2px"
          />
          <MenuRow title="All Messages" newMessage={21} />
          <MenuRow title="Unread" newMessage={89} />
          <MenuRow title="Important" newMessage={6} />
          <MenuRow title="Draft" newMessage={27} />
          <ColoredLine 
            color={dark_cont1}
            height="2px"
          />
          <MenuRow title="Groups" newMessage={3} />
          <MenuRow title="Channels" newMessage={18} />
          <ColoredLine 
            color={dark_cont1}
            height="2px"
          />
          <MenuRow title="Media" newMessage={18} />
          <MenuRow title="Help" />
          <MenuRow title="Settings" />
        </StyledChatMenu>
    )
}

export default ChatMenu