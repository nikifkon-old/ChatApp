import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Nav,
  PropsRoute,
} from '../../components'
import {
  ChatBase,
  Menu,
  SideBar,
  DialogList,
} from '../../containers'
import {
  withHeaderStatus,
} from '../../HOC'
import { AppContainer } from '../../styles'

function ChatAppRoute(props) {
  const {headerIsOpen, handleAppHeader} = props
  const match = useRouteMatch()
  return (
    <AppContainer headerIsOpen={headerIsOpen}>
      <Nav handleHeader={handleAppHeader} />
      <Menu />
      <DialogList />
      <Switch>
        <PropsRoute
          exact
          path={match.url}
          component={ChatBase}
          content="chatRoom"
          {...props}
          />
        <PropsRoute
          exact
          path={`${match.url}/all messages`}
          component={ChatBase}
          content="chatRoom"
          {...props}
          />
        <PropsRoute
          exact
          path={`${match.url}/unread`}
          component={ChatBase}
          content="chatRoom"
          params="unread"
          {...props}
          />
        <PropsRoute
          exact
          path={`${match.url}/stared`}
          component={ChatBase}
          content="chatRoom"
          params="stared"
          {...props}
          />
        <PropsRoute
          path={`${match.url}/create room`}
          component={ChatBase}
          content="form"
          {...props}
        />
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
