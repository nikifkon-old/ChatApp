import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { ColoredLine } from '../../index'
import ChatLogo from '../../../../assets/logo.png'
import UserCard from '../UserCard'
import UserDetail from '../UserDetail'
import { StyledChatLogo } from './styles'
import { ContentGrid, IconBtn } from '../../../styles'
import { withChatInfo } from '../../../HOC'

const ChatInfo = (props) => {
  const { interlocutor } = props
  return (
      <Fragment>
        <ContentGrid container
          justify="space-between"
          alignItems="center"
        >
          <IconBtn size="small">
            <StyledChatLogo src={ChatLogo} width="20px" alt="Logo"/>
          </IconBtn>
          <IconBtn size="small">
            <i className="material-icons">
              more_horiz
            </i>
          </IconBtn>
        </ContentGrid>

        <UserCard
          interlocutor={interlocutor} />
        <ColoredLine />
        <UserDetail
          interlocutor={interlocutor}
        />
      </Fragment>
  )
}

ChatInfo.propTypes = {
  interlocutor: PropTypes.object,
}

export default withChatInfo(ChatInfo)
