import React, { Fragment } from 'react'
import { Grid, IconButton as MaterialIconButton } from '@material-ui/core'
import PropTypes from 'prop-types'

import { IconButton } from '../index'
import ChatLogo from '../../../assets/logo.png'
import DefaultAvatar from '../../../assets/defaultAvatar.jpg'
import { ContentGrid, H1, P, Img } from '../../styles'
import { StyledChatLogo } from './styles'

function ChatInfo({dialog}) {
  let interlocutor = dialog.interlocutor

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

      <Grid container
        direction="column"
        alignItems="center"
      >
        <Img src={interlocutor.avatar} width="150px" round alt="avatar"/>
        <H1>{interlocutor.user}</H1>
        <P noMargin>location</P>
      </Grid>
    </Fragment>
  );
}

ChatInfo.propTypes = {
  dialog: PropTypes.shape({
    interlocutor: PropTypes.shape({
      avatar: PropTypes.string,
      user: PropTypes.string,
    })
  })
};

ChatInfo.defaultProps = {
  dialog: {
    interlocutor: {
      user: 'not',
      avatar: DefaultAvatar
    }
  }
}

export default ChatInfo;
