import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import { ColoredLine } from '../../components'
import {
  Menu,
  DialogForm,
  GroupForm,
} from '../../components/RoomCreate'
import {
  GridItem,
  ContentGrid,
  Content,
  H4,
  dark_cont1,
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
        <H4 center>Create: </H4>
        <ColoredLine color={dark_cont1} />
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
