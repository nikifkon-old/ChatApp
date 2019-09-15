import React from 'react'
import PropTypes from 'prop-types'

import { withChatInfo } from '../../../HOC'
import { StyledTopPanel } from '../styles'
import { IconBtn, H4, dark_bg2 } from '../../../styles'

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
      <IconBtn
        background={dark_bg2}
        borderRadius="0"
      >
        <i className="material-icons">
          star
        </i>
      </IconBtn>
    </StyledTopPanel>
  )
}

TopPanel.propTypes = {
  interlocutor: PropTypes.shape({
    user: PropTypes.string.isRequired,
  })
}

export default withChatInfo(TopPanel)
