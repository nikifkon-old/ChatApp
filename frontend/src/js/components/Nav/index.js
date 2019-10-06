import React from 'react'
import PropTypes from 'prop-types'

import { IconButton } from '../index'
import { StylesChatNav } from './styles'

const ChatNav = ({HandleHeader}) => {
    return (
      <section>
        <StylesChatNav
          container
          direction="column"
          alignItems="center"
        >
          <IconButton icon="menu" onClick={HandleHeader} />
        </StylesChatNav>
      </section>
    )
}

ChatNav.propTypes = {
  HandleHeader: PropTypes.func.isRequired
}

export default ChatNav
