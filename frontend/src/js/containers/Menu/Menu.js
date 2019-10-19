import React from 'react'

import { H1, dark_cont1 } from '../../styles'
import { StyledChatMenu } from './styles'
import { ColoredLine, MenuItem } from '../../components'

function Menu() {
  return (
    <StyledChatMenu>
      <H1>Inbox</H1>
      <ColoredLine
        color={dark_cont1}
        height="2px"
      />
    <MenuItem id={1} title="All Messages" link="all-messages" unreadCount={21} />
      <MenuItem id={2} title="Unread" link="messages?filter=unread" unreadCount={89} />
      <MenuItem id={3} title="Stared" link="messages?filter=stared" unreadCount={6} />
      <MenuItem id={4} title="Create room" />
      <ColoredLine
        color={dark_cont1}
        height="2px"
      />
      <MenuItem id={5} title="Groups" unreadCount={3} />
      <MenuItem id={6} title="Channels" unreadCount={18} />
      <ColoredLine
        color={dark_cont1}
        height="2px"
      />
      <MenuItem id={7} title="Media" unreadCount={18} />
      <MenuItem id={8} title="Help" />
      <MenuItem id={9} title="Settings" />
    </StyledChatMenu>
  );
}

export default Menu;
