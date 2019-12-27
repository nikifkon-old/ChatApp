import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import {
  Menu,
  DialogForm,
  GroupForm,
} from '../../components/RoomCreate'
import { Content } from '../../styles'
import { AppContentWrap } from '../../components'

function RoomCreateRoute() {
  const { url } = useRouteMatch()

  return (
    <AppContentWrap>
      <Content>
        <Switch>
          <Route exact path={`${url}`} component={Menu} />
          <Route path={`${url}/dialog`} component={DialogForm} />
          <Route path={`${url}/group`} component={GroupForm} />
        </Switch>
      </Content>
    </AppContentWrap>
  );
}

export default RoomCreateRoute;
