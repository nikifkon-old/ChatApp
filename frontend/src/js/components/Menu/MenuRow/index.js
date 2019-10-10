import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { TabsConstructor } from '../../../HOC'
import { Btn, P, dark_cont2, dark_active } from '../../../styles'

const MenuRow = ({isActive, handleActiveTabs, unreadCount, title, id}) => {
  title = title.toLowerCase()
  let styles = {}
  isActive ? styles = {
    btnBackground: dark_active,
    titleColor: "#fff"
  } :
  styles = {
    btnBackground: "",
    titleColor: dark_cont2
  }

  return (
    <Link
      background={styles.btnBackground}
      width="100%"
      to={`/app/${title}`}
    >
      <P center grid_left color={styles.titleColor}>{title}</P>
      <P center color="#fff">{unreadCount}</P>
    </Link>
  )
}

MenuRow.propTypes = {
  title: PropTypes.string.isRequired,
  unreadCount: PropTypes.number,
  id: PropTypes.number.isRequired,
  handleActiveTabs: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default TabsConstructor(MenuRow)
