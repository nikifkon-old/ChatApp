import React from 'react'
import PropTypes from 'prop-types'

import { IconButton, Popover } from '../../../index'
import { ContentGrid } from '../../../../styles'

function AttachFile() {
  return (
    <Popover
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      button={
        ({handleClick}) => (
          <IconButton
            icon="attach_file"
            onClick={handleClick}
          />
        )
      }
      modal={
        () => (
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
        )
      }
    />
);
}

export default AttachFile;
