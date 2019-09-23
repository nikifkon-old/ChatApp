import React from 'react'
import PropTypes from 'prop-types'

import { withChatInfo } from '../../../HOC'
import { StyledTopPanel } from '../styles'
import { IconButton } from '../../index'
import { H4, dark_bg2 } from '../../../styles'

const TopPanel = ({interlocutor}) => {
  let username
  if (interlocutor) {
    username = interlocutor.user
  }

  return (
    <StyledTopPanel
      container
      justify="space-between"
      alignItems="center"
    >
      <H4>{username}</H4>
      <IconButton
        icon="star"
        background={dark_bg2}
        borderRadius="0"
      />
    </StyledTopPanel>
  )
}

TopPanel.propTypes = {
  interlocutor: PropTypes.shape({
    user: PropTypes.string.isRequired,
  })
}

export default withChatInfo(TopPanel)
