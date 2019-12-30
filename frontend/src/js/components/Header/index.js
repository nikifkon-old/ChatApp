import React from 'react'
import { Link } from 'react-router-dom'

import { StyledHeader } from './styles'
import { P } from '../../styles'

function Header() {
  return (
    <StyledHeader>
      <Link to="/">
        <P>
          Home
        </P>
      </Link>
      <Link to="/app">
        <P>
          App
        </P>
      </Link>
      <Link to="/login">
        <P>
          Login
        </P>
      </Link>
      <Link to="/get-started">
        <P>
          Get-Started
        </P>
      </Link>
    </StyledHeader>
  );
}

export default Header;
