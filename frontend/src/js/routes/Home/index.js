import React, { Fragment } from 'react'
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'

import { Btn, H1, P } from '../../styles'
import { StyledLogo } from './styles'
import Logo from '../../../assets/logo.png'

const Home = () => {
    return (
        <Grid container direction="column" alignItems="center">
          <StyledLogo src={Logo} alt="logo" />
          <H1>Mui Chat</H1>
          <P>Just chat and nothing more</P>
          <Grid container item direction="row" justify="center">
            <Link to="/login">
              <Btn variant="outlined">Login</Btn>
            </Link>
            <Link to="/get-started">
              <Btn variant="contained" color="primary">Get started</Btn>
            </Link>
          </Grid>
        </Grid>
    )
}

export default Home