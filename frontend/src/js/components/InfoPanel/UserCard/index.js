import React from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'

import DefaultAvatar from '../../../../assets/defaultAvatar.jpg'
import { H1, P, Img } from '../../../styles'

const UserCard = ({interlocutor}) => {
  let data = {
    avatar: DefaultAvatar,
    user: "Interlocutor"
  }
  if (interlocutor) {
    const { avatar, user } = interlocutor
    if (avatar) {
      data.avatar = avatar
    }
    if (user) {
      data.user = user
    }
  }
  return (
      <Grid container
        direction="column"
        alignItems="center"
      >
        <Img src={data.avatar} width="150px" round alt="avatar"/>
        <H1>{data.user}</H1>
        <P noMargin>location</P>
      </Grid>
  )
}

UserCard.propTypes = {
  interlocutor: PropTypes.shape({
    avatar: PropTypes.string,
    user: PropTypes.string,
  })
}

export default UserCard
