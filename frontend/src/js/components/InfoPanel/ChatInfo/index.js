import React, { Fragment } from 'react'
import { Grid, IconButton } from '@material-ui/core'

import { ColoredLine } from '../..'
import ChatLogo from '../../../../assets/logo.png'
import UserCard from '../UserCard'
import UserDetail from '../UserDetail'
import { StledChatLogo } from './styles'

const ChatInfo = () => {
    return (
        <Fragment>
          <Grid container
            justify="space-between"
            alignItems="center"
          >
            <IconButton size="small">
              <StledChatLogo src={ChatLogo} width="20px" alt="Logo"/>
            </IconButton>
            <IconButton size="small">
              <i className="material-icons">
                more_horiz
              </i>
            </IconButton>
          </Grid>
          <UserCard 
            username="Kirsten Mckellar"
            location="Cape Town, RSA" />
          <ColoredLine />
          <UserDetail
            nickname="test nickname"
            tel="+83929292922"
            date="8 Match 1900"
            gender="Femail"
            lang="ru"
          />
        </Fragment>
    )
}

export default ChatInfo