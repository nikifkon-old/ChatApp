import React from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'

import Avatar from '../../../../assets/test_user_avatar.jpg'
import { H1, P, Img } from '../../../styles'

const UserCard = ({username, location}) => {
    return (
        <Grid container
          direction="column"
          alignItems="center"
        >
          <Img src={Avatar} width="150px" round alt="avatar"/>
          <H1>{username}</H1>
          <P noMargin>{location}</P>
        </Grid>
    )
}

UserCard.propTypes = {
  username: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
}

export default UserCard