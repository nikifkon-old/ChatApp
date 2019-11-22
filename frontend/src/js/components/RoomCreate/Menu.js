import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { Content, StyledLink, Btn, P } from '../../styles'

function CreatingMenu() {
  return (
    <Fragment>
    <StyledLink
      to="create/dialog"
      width="100%"
    >
      <Btn>
        <i className="material-icons">
          person_add
        </i>
        <Content>
          <P>Dialog</P>
        </Content>
      </Btn>
    </StyledLink>
    <StyledLink
      to="create/group"
      width="100%"
    >
      <Btn>
        <i className="material-icons">
          group_add
        </i>
        <Content>
          <P>Group</P>
        </Content>
      </Btn>
    </StyledLink>
    </Fragment>
  );
}

export default CreatingMenu;
