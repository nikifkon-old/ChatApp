import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { StyledTopPanel } from './styles'
import { IconButton } from '../../index'
import { GridItem, P, H4 } from '../../../styles'
import { Menu, MenuItem } from '@material-ui/core'

function TopPanel(props) {
  const { title, deleteChat, id } = props
  const [anchorEl, setAnchorEl] = useState(null)
  
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    deleteChat({id})
  }

  return (
    <StyledTopPanel>
      <GridItem
        component={H4}
        column="1"
        center
      >
        {title}
      </GridItem>
      {
        false
          ? <GridItem
            component={P}
            column="2"
            center
          >
            is typing...
          </GridItem>
          : null
      }
      <GridItem
        column="4"
        center
        component={IconButton}
        icon="more_vert"
        size="small"
        onClick={handleClick}
      />
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        onClose={handleClose}
      >
        <MenuItem
          onClick={handleDelete}
        >
          Delete chat
        </MenuItem>
      </Menu>
    </StyledTopPanel>
  )
}

TopPanel.propTypes = {
  title: PropTypes.string,
  deleteChat: PropTypes.func.isRequired,
  id: PropTypes.number,
}

export default TopPanel
