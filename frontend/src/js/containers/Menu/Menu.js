import React from 'react'

import { H1 } from '../../styles'
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

      <ColoredLine height="2px" color="secondary"/>
      <MenuItem id={1} title="Dialogs" link="messages" unreadCount={dialogsUnread} />
      <MenuItem id={2} title="Unread" link="messages?filter=unread" unreadCount={0} />
      <MenuItem id={3} title="Stared" link="messages?filter=stared" unreadCount={0} />

      <ColoredLine height="1px" color="secondary"/>
      <MenuItem id={5} title="Groups" unreadCount={groupsUnread} />
      
      <ColoredLine height="1px" color="secondary"/>
      <MenuItem id={4} title="Create room" link="create" />

      <ColoredLine height="1px" color="secondary"/>
    </StyledChatMenu>
  );
}

export default Menu;
