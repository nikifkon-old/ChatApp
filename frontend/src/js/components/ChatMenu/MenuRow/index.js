import React from 'react'
import PropTypes from 'prop-types'

import { Btn, P, dark_cont2 } from '../../../styles'

const MenuRow = ({title, newMessage}) => {
    return (
        <Btn width="100%">
          <P center grid_left color={dark_cont2}>{title}</P>
          <P center color="#fff">{newMessage}</P>
        </Btn>
    )
}

MenuRow.propTypes = {
  title: PropTypes.string.isRequired,
  newMessage: PropTypes.number,
}

export default MenuRow