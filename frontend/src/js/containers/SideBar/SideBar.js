import React from 'react'
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
  getActiveDialog,
} from '../../reducers/selectors'
import { ColoredLine } from '../../components'
import { dark_cont1 } from '../../styles'
import { StyledInfoPanel } from './styles'

function SideBar(props) {
  const {
    username,
    dialog,
    logoutUser,
  } = props
  return (
    <StyledInfoPanel>

      <AccountInfo
        username={username}
        logoutUser={logoutUser}
      />
      <ColoredLine color={dark_cont1} />

      <ChatInfo dialog={dialog} />
      <ColoredLine color={dark_cont1} />

      <ChatDetail />
    </StyledInfoPanel>
  );
}

SideBar.propTypes = {
  username: PropTypes.string,
  logoutUser: PropTypes.func.isRequired,
  dialog: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    username: getUserInfo(state).user,
    dialog: getActiveDialog(state)
  };
};

export default connect(
  mapStateToProps,
  {
    logoutUser
  }
)(SideBar);
