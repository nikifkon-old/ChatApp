import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { P, dark_cont2, dark_active } from '../../styles'

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
      <P center grid_left color={dark_cont2}>{title}</P>
      <P center color="#fff">{unreadCount}</P>
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
  border-radius: 6px;
  background: ${props => props.isActive
    ? dark_active
    : "inherit"
  };
`;

export default MenuRow;
