import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Nav,
  PropsRoute,
  RoomCreating,
} from '../../components'
import {
  Chat,
  Menu,
  SideBar,
  DialogList,
} from '../../containers'
import {
  withHeaderStatus,
} from '../../HOC'
import { useWebsocket } from '../../hooks/'
import { AppContainer, StyledChatWrap } from '../../styles'

function ChatAppRoute(props) {
  const { headerIsOpen, handleAppHeader } = props
  const match = useRouteMatch()

  useWebsocket()

  return (
    <AppContainer headerIsOpen={headerIsOpen}>
      <Nav handleHeader={handleAppHeader} />
      <Menu />
      <DialogList />
      <StyledChatWrap>
        <Switch>
          <PropsRoute
            exact
            path={`${match.url}/create room`}
            component={RoomCreating}
            {...props}
          />
          <PropsRoute
            exact
            path={`${match.url}/:filter`}
            component={Chat}
            {...props}
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
