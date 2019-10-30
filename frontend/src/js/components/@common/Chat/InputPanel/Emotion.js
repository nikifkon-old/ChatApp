import React from 'react'
import { Picker } from 'emoji-mart'
import PropTypes from 'prop-types'

import { IconButton, Popover } from '../../../index'
import { ContentGrid } from '../../../../styles'

function Emotion({onSelect}) {
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
            <Picker
              onSelect={onSelect}
            />
          </ContentGrid>
        )
      }
    />
  );
}

Emotion.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default Emotion;
