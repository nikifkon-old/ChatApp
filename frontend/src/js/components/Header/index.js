import React from 'react'
import { Link } from 'react-router-dom'

import { StyledHeader } from './styles'
import { P } from '../../styles'

function Header() {
  return (
    <StyledHeader>
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
  );
}

export default Header;
