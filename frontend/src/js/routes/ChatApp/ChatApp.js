import React from 'react'
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Nav,
} from '../../components'
import {
  DialogChat,
  Menu,
  SideBar,
  DialogList,
  GroupList,
} from '../../containers'
import { RoomCreate } from './index'
import {
  withHeaderStatus,
} from '../../HOC'
import { useWebsocket } from './index'
import { AppContainer } from '../../styles'

function ChatAppRoute(props) {
  const { headerIsOpen, handleAppHeader } = props
  const { url } = useRouteMatch()

  useWebsocket()

  return (
    <AppContainer headerIsOpen={headerIsOpen}>
      <Nav handleHeader={handleAppHeader} />
      <Menu />
      <Switch>
        <Route exact path={`${url}`}>
          <Redirect to={`${url}/messages`}/>
        </Route>
        <Route
          path={`${url}/create`}
          component={RoomCreate}
        />
        <Route
          path={`${url}/messages`}
        >
          <DialogList />
          <DialogChat />
        </Route>
        <Route
          path={`${url}/groups`}
        >
          <GroupList />
        </Route>
      </Switch>
      <SideBar />
    </AppContainer>
  );
}

ChatAppRoute.propTypes = {
  match: PropTypes.object.isRequired,
  headerIsOpen: PropTypes.bool.isRequired,
  handleAppHeader: PropTypes.func.isRequired,
};

export default withHeaderStatus(ChatAppRoute);
