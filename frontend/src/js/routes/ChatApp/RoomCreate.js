import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import { ColoredLine } from '../../components'
import {
  Menu,
  DialogForm,
} from '../../components/RoomCreate'
import {
  ContentGrid,
  H4,
  dark_cont1,
} from '../../styles'

function RoomCreateRoute() {
  const { url } = useRouteMatch()

  return (
    <ContentGrid
      container
      direction="column"
      alignItems="center"
    >
      <H4>Create: </H4>
      <ColoredLine color={dark_cont1} />
      <Switch>
        <Route exact path={`${url}`} component={Menu} />
        <Route path={`${url}/dialog`} component={DialogForm} />
        <Route path={`${url}/group`} component={() =><p>group</p>} />
        <Route path={`${url}/channel`} component={() =><p>channel</p>} />
      </Switch>
    </ContentGrid>
  );
}

export default RoomCreateRoute;
