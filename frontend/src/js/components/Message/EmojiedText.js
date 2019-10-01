import React from 'react'
import PropTypes from 'prop-types'
import { Emoji } from 'emoji-mart'

function EmojiedText({text}) {
  const textArray = text.split(':')
  return (
    <span>
      {
        textArray.map(
          (el, i) => (i % 2 === 1)
            ? <Emoji key={i} emoji={el} size={25} />
            : el
        )
      }
    </span>
  )
}

EmojiedText.propTypes = {
  text: PropTypes.string.isRequired,
}

export default EmojiedText
