import React from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'

import Avatar from '../../../../assets/test_user_avatar.jpg'
import { H1, P } from '../../../styles'
import { StyledAvatar } from './styles'

const UserCard = ({username, location}) => {
    return (
        <Grid container
          direction="column"
          alignItems="center"
        >
          <StyledAvatar src={Avatar} width="150px" alt="avatar"/>
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