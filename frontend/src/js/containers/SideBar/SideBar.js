import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

import {
  AccountInfo,
  ChatInfo,
  ChatDetail,
} from '../../components/SideBar'
import {
  logoutUser,
} from '../../actions/authActions'
import { ColoredLine } from '../../components'
import { dark_cont1 } from '../../styles'
import { StyledInfoPanel } from './styles'
import { useChatInfo, useAction } from '../../hooks'
import { getUserInfo, getUserId } from '../../selectors/AuthSelectors'

function SideBar() {
  const [data, details] = useChatInfo()
  const username = useSelector(state => getUserInfo(state).user)
  const userId = useSelector(state => getUserId(state))
  const logout = useAction(logoutUser)

  return (
    <StyledInfoPanel>
      <AccountInfo
        username={username}
        userId={userId}
        logout={logout}
      />
      <ColoredLine color={dark_cont1} />
      {
        data && (
          <Fragment>
            <ChatInfo data={data} />
            <ColoredLine color={dark_cont1} />

            <ChatDetail data={details} />
          </Fragment>
        )
      }
    </StyledInfoPanel>
  );
}

export default SideBar