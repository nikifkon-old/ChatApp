import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Menu } from '@material-ui/core'

import { IconButton, Popover } from '../../../index'
import { ContentGrid } from '../../../../styles'

function AttachFile() {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Fragment>
      <IconButton
        icon="attach_file"
        onClick={handleClick}
      />
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <ContentGrid
          container
          alignItems="center"
        >
          <IconButton
            icon="photo_camera"
            borderRadius="0"
          />
          <IconButton
            icon="videocam"
            borderRadius="0"
          />
          <IconButton
            icon="music_note"
            borderRadius="0"
          />
        </ContentGrid>
      </Menu>
    </Fragment>
  );
}

export default AttachFile;
