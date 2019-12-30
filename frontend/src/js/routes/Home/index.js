import React from 'react'
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'

import { Btn, H1, P, SectionContainer } from '../../styles'
import { StyledLogo } from './styles'
import Logo from '../../../assets/logo.png'

const Home = () => {
    return (
        <SectionContainer container
          direction="column"
          alignItems="center"
        >
          <StyledLogo src={Logo} alt="logo" />
          <H1>Mui Chat</H1>
          <P>Just chat and nothing more</P>
          <Grid container item direction="row" justify="space-evenly">
            <Link to="/login">
              <Btn
                variant="outlined"
                color="secondary"
                width="300px"
              >
                Login
              </Btn>
            </Link>
            <Link to="/get-started">
              <Btn
                color="primary"
                variant="contained"
                width="300px"
              >
                Get started
              </Btn>
            </Link>
          </Grid>
        </SectionContainer>
    )
}

export default Home
