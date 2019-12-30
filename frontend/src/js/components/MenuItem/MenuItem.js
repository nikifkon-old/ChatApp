import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { P } from '../../styles'

const MenuRow = ({unreadCount, title, link}) => {
  let location = useLocation('/app');
  const page = `${location.pathname}${location.search}`

  title = title.toLowerCase();
  const isActive = page === `/app/${link}` || page === `/app/${title}`

  return (
    <StyledLink
      isActive={isActive}
      to={`/app/${link || title}`}
    >
      <P center grid_left color="secondary">{title}</P>
      <StyledP center>
        {unreadCount > 0 && unreadCount}
      </StyledP>
    </StyledLink>
  )
};

MenuRow.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string,
  unreadCount: PropTypes.number,
  id: PropTypes.number.isRequired,
};


const StyledLink = styled(({isActive, ...props}) => <Link {...props} />)`
  width: 100%;
  margin: 8px 0;
  border-radius: 6px;
  background: ${props => props.isActive
    ? props.theme.color.primary
    : "inherit"
  };
`;

const StyledP = styled(P)`
  min-width: 21px;
  width: min-content;
  margin: 0 auto;
  background: #fff;
  color: ${props => props.theme.color.primary};
  border-radius: 50%;
`

export default MenuRow;
