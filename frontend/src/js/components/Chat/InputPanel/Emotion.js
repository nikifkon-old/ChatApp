import React from 'react'
import PropTypes from 'prop-types'

import { IconButton, Popover } from '../../index'
import { ContentGrid, P } from '../../../styles'

const Emotion = () => {
  return (
    <Popover
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      button={
        ({handleClick}) => (
          <IconButton
            icon="insert_emoticon"
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
            <P>Select Emotion</P>
          </ContentGrid>
        )
      }
    />
  )
}

export default Emotion
