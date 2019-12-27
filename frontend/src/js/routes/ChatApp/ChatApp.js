import React from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Nav, AppContentWrap,
} from '../../components'
import {
  DialogChat,
  Menu,
  SideBar,
  DialogList,
  GroupList,
  GroupChat,
  Profile,
} from '../../containers'
import { RoomCreate } from './index'
import {
  withHeaderStatus,
} from '../../HOC'
import { useWebsocket } from '../../hooks'
import { AppContainer } from '../../styles'
import { getRouterState } from '../../selectors/RouterSelectors'
import { Route404 } from '../index'

function ChatAppRoute(props) {
  const { headerIsOpen, handleAppHeader } = props
  const { url } = useRouteMatch()
  const routerState = useSelector(state => getRouterState(state))

  useWebsocket()

  return (
    <AppContainer headerIsOpen={headerIsOpen}>
      <Nav handleHeader={handleAppHeader} />
      <Menu />
      <Switch>
        <Route exact path={`${url}`}>
          <Redirect to={{
            pathname: `${url}/messages`,
            state: routerState
          }}/>
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
          <GroupChat />
        </Route>
        <Route
          path={`${url}/profile/:id`}
          component={Profile}
        />
        <Route
          path="/"
        >
          <AppContentWrap>
            <Route404 />
          </AppContentWrap>
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
