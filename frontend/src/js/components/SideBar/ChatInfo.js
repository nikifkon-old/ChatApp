import React, { Fragment } from 'react'
import { Grid, IconButton as MaterialIconButton } from '@material-ui/core'
import PropTypes from 'prop-types'

import { IconButton } from '../index'
import ChatLogo from '../../../assets/logo.png'
import DefaultAvatar from '../../../assets/defaultAvatar.jpg'
import { ContentGrid, H1, P, Img } from '../../styles'
import { StyledChatLogo } from './styles'

function ChatInfo({data}) {
  if(!data.avatar) {
    data.avatar = DefaultAvatar
  }
  if(!data.name) {
    data.name = 'not' 
  }
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
        <Img src={data.avatar} width="150px" round alt="avatar"/>
        <H1>{data.name}</H1>
        <P noMargin>location</P>
      </Grid>
    </Fragment>
  );
}

ChatInfo.propTypes = {
  data: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
  })
};

export default ChatInfo;
