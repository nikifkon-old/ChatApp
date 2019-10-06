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
        <MenuRow id={1} title="All Messages" unreadCount={21} />
        <MenuRow id={2} title="Unread" unreadCount={89} />
        <MenuRow id={3} title="Important" unreadCount={6} />
        <MenuRow id={4} title="Create room" />
        <ColoredLine
          color={dark_cont1}
          height="2px"
        />
        <MenuRow id={5} title="Groups" unreadCount={3} />
        <MenuRow id={6} title="Channels" unreadCount={18} />
        <ColoredLine
          color={dark_cont1}
          height="2px"
        />
        <MenuRow id={7} title="Media" unreadCount={18} />
        <MenuRow id={8} title="Help" />
        <MenuRow id={9} title="Settings" />
        </StyledChatMenu>
    )
}

export default ChatMenu
