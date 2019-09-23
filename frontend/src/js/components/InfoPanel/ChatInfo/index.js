import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { IconButton as MaterialIconButton } from '@material-ui/core'

import { ColoredLine, IconButton } from '../../index'
import ChatLogo from '../../../../assets/logo.png'
import UserCard from '../UserCard'
import UserDetail from '../UserDetail'
import { StyledChatLogo } from './styles'
import { ContentGrid, dark_cont1 } from '../../../styles'
import { withChatInfo } from '../../../HOC'

const ChatInfo = (props) => {
  const { interlocutor } = props
  return (
      <Fragment>
        <ContentGrid container
          justify="space-between"
          alignItems="center"
        >
          <MaterialIconButton size="small">
            <StyledChatLogo src={ChatLogo} width="20px" alt="Logo"/>
          </MaterialIconButton>
          <IconButton icon="more_horiz" size="small" />
        </ContentGrid>

        <UserCard
          interlocutor={interlocutor} />
        <ColoredLine color={dark_cont1} />
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
