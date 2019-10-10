import React from 'react'
import { Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Nav,
  Menu,
  PropsRoute,
} from '../../components'
import { ChatBase } from '../../containers'
import { AppContainer } from '../../styles'

function ChatAppRoute({match, handleHeader, ...props}) {
  console.log(match);
  return (
    <AppContainer>
      <Nav handleHeader={handleHeader} />
      <Menu />
      <Switch>
        <PropsRoute
          exact
          path={match.url}
          component={ChatBase}
          showChat
          {...props}
          />
        <PropsRoute
          path={`${match.url}/create room`}
          component={ChatBase}
          showFormCreating
          {...props}
        />
      </Switch>
    </AppContainer>
  );
}

ChatAppRoute.propTypes = {
  match: PropTypes.object.isRequired,
  handleHeader: PropTypes.func.isRequired,
}

export default ChatAppRoute
