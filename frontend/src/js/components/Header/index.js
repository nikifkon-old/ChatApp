import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { P, ContentGrid, Content, Header as StyledHeader } from '../../styles'

const Header = () => {
    return (
        <StyledHeader container
          justify="space-evenly"
          alignItems="center"
        >
          <Link to="/">
            <P color="#fff">
              Home
            </P>
          </Link>
          <Link to="/app">
            <P color="#fff">
              App
            </P>
          </Link>
          <Link to="/login">
            <P color="#fff">
              Login
            </P>
          </Link>
          <Link to="/get-started">
            <P color="#fff">
              Get-Started
            </P>
          </Link>
        </StyledHeader>
    )
}

export default Header