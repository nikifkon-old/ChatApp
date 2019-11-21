import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  AccountInfo,
  ChatInfo,
  ChatDetail,
} from '../../components/SideBar'
import {
  logoutUser,
} from '../../actions/authActions'
import {
  getUserInfo,
} from '../../reducers/selectors'
import { ColoredLine } from '../../components'
import { dark_cont1 } from '../../styles'
import { StyledInfoPanel } from './styles'
import { useChatInfo } from '../../hooks'

function SideBar(props) {
  const {
    username,
    logoutUser,
  } = props
  const data = useChatInfo()
  
  return (
    <StyledInfoPanel>

      <AccountInfo
        username={username}
        logoutUser={logoutUser}
      />
      <ColoredLine color={dark_cont1} />
      {
        data && (
          <Fragment>
            <ChatInfo data={data} />
            <ColoredLine color={dark_cont1} />

            <ChatDetail />
          </Fragment>
        )
      }
    </StyledInfoPanel>
  );
}

SideBar.propTypes = {
  username: PropTypes.string,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    username: getUserInfo(state).user,
  };
};

export default connect(
  mapStateToProps,
  {
    logoutUser
  }
)(SideBar);
