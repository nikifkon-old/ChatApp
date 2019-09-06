import React from 'react'
import PropTypes from 'prop-types'

import { ChatMenuWithHandleViewList } from '../../../HOC'
import { Btn, P, dark_cont2, dark_bg3 } from '../../../styles'

const MenuRow = ({title, newMessage, handleViewList, active}) => {
    
    const handleActiveView = () => handleViewList(title)

    let styles = {}
    active ? styles = {
      btnBackground: dark_bg3,
      titleColor: "#fff"
    } : 
    styles = {
      btnBackground: "",
      titleColor: dark_cont2
    }

    return (
        <Btn background={styles.btnBackground} width="100%" onClick={handleActiveView}>
          <P center grid_left color={styles.titleColor}>{title}</P>
          <P center color="#fff">{newMessage}</P>
        </Btn>
    )
}

MenuRow.propTypes = {
  title: PropTypes.string.isRequired,
  newMessage: PropTypes.number,
  handleViewList: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
}

export default ChatMenuWithHandleViewList(MenuRow)