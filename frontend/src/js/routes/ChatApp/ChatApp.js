import React from 'react'
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Nav,
} from '../../components'
import {
  Chat,
  Menu,
  SideBar,
  DialogList,
} from '../../containers'
import { RoomCreate } from './index'
import {
  withHeaderStatus,
} from '../../HOC'
import { useWebsocket } from './index'
import { AppContainer, StyledChatWrap } from '../../styles'

function ChatAppRoute(props) {
  const { headerIsOpen, handleAppHeader } = props
  const { url } = useRouteMatch()

  useWebsocket()

  return (
    <AppContainer headerIsOpen={headerIsOpen}>
      <Nav handleHeader={handleAppHeader} />
      <Menu />
      <DialogList />
      <StyledChatWrap>
        <Switch>
          <Route exact path={`${url}`}>
            <Redirect to={`${url}/messages`}/>
          </Route>
          <Route
            path={`${url}/create`}
            component={RoomCreate}
          />
          <Route
            path={`${url}`}
            component={Chat}
          />
        </Switch>
      </StyledChatWrap>
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
