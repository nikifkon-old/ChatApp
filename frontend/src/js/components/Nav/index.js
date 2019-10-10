import React from 'react'
import PropTypes from 'prop-types'

import { IconButton } from '../index'
import { StylesChatNav } from './styles'

const ChatNav = ({handleHeader}) => {
    return (
      <section>
        <StylesChatNav
          container
          direction="column"
          alignItems="center"
        >
          <IconButton icon="menu" onClick={handleHeader} />
        </StylesChatNav>
      </section>
    )
}

ChatNav.propTypes = {
  handleHeader: PropTypes.func.isRequired
}

export default ChatNav
