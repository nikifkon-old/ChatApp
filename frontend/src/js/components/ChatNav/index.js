import React from 'react'
import PropTypes from 'prop-types'

import { StylesChatNav } from './styles'
import { IconBtn } from '../../styles'

const ChatNav = ({HandleHeader}) => {
    return (
      <section>
        <StylesChatNav>
          <IconBtn onClick={HandleHeader}>
            <i className="material-icons light">
              menu
            </i>
          </IconBtn>
        </StylesChatNav>
      </section>
    )
}

ChatNav.propTypes = {
  HandleHeader: PropTypes.func.isRequired
}

export default ChatNav
