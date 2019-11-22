import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import {
  Menu,
  DialogForm,
  GroupForm,
} from '../../components/RoomCreate'
import {
  GridItem,
  ContentGrid,
  Content,
} from '../../styles'

function RoomCreateRoute() {
  const { url } = useRouteMatch()

  return (
    <GridItem
      column="3/5"
      component={ContentGrid}
      container
      direction="column"
      alignItems="center"
    >
      <Content>
        <Switch>
          <Route exact path={`${url}`} component={Menu} />
          <Route path={`${url}/dialog`} component={DialogForm} />
          <Route path={`${url}/group`} component={GroupForm} />
        </Switch>
      </Content>
    </GridItem>
  );
}

export default RoomCreateRoute;
