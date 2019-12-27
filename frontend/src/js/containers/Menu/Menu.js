import React from 'react'

import { H1, dark_cont1 } from '../../styles'
import { StyledChatMenu } from './styles'
import { ColoredLine, MenuItem } from '../../components'
import { useSelector } from 'react-redux'
import { getUnreadCount } from '../../selectors/DialogSelectors'
import { getFirstUnread } from '../../selectors/GroupSelectors'

function Menu() {
  const dialogsUnread = useSelector(state => getUnreadCount(state))
  const groupsUnread = useSelector(state => getFirstUnread(state))

  return (
    <StyledChatMenu>
      <H1>Inbox</H1>
      <ColoredLine
        color={dark_cont1}
        height="2px"
      />
    <MenuItem id={1} title="Dialogs" link="messages" unreadCount={dialogsUnread} />
      <MenuItem id={2} title="Unread" link="messages?filter=unread" unreadCount={0} />
      <MenuItem id={3} title="Stared" link="messages?filter=stared" unreadCount={0} />
      <ColoredLine
        color={dark_cont1}
        height="2px"
      />
      <MenuItem id={5} title="Groups" unreadCount={groupsUnread} />
      <ColoredLine
        color={dark_cont1}
        height="2px"
      />
      <MenuItem id={4} title="Create room" link="create" />
      <ColoredLine
        color={dark_cont1}
        height="2px"
      />
    </StyledChatMenu>
  );
}

export default Menu;
