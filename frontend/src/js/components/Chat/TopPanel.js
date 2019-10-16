import React from 'react'
import PropTypes from 'prop-types'

import { StyledTopPanel } from './styles'
import { IconButton } from '../index'
import { H4, dark_bg2 } from '../../styles'

function TopPanel(props) {
  const {
    dialog
  } = props
  let user = dialog && dialog.interlocutor && dialog.interlocutor.user;

  return (
    <StyledTopPanel
      container
      justify="space-between"
      alignItems="center"
    >
      <H4>{user}</H4>
      <IconButton
        icon="star"
        background={dark_bg2}
        borderRadius="0"
      />
    </StyledTopPanel>
  )
}

TopPanel.propTypes = {
  dialog: PropTypes.shape({
    interlocutor: PropTypes.shape({
      user: PropTypes.string.isRequired,
    }).isRequired,
  }),
}

TopPanel.dp

export default TopPanel
