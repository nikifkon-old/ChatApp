import React, { Fragment } from 'react'

import { ColoredLine } from '../index'
import { Content, StyledLink, Btn, P, H4 } from '../../styles'

function CreatingMenu() {
  return (
    <Fragment>
      <H4>Create: </H4>
      <ColoredLine color={props => props.theme.color.secondary} />
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
