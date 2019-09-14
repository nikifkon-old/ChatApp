import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { StyledHeader } from './styles'
import { P } from '../../styles'

const Header = ({isOpen}) => {
    return (
        <StyledHeader
          show={isOpen}
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

Header.propTypes = {
  isOpen: PropTypes.bool.isRequired
}

export default Header
