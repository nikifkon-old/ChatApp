import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Emoji } from 'emoji-mart'

function EmojiedText({text}) {
  const textArray = text.split(':')
  return (
    <Fragment>
      {
        textArray.map(
          (el, i) => (i % 2 === 1)
            ? <Emoji key={i} emoji={el} size={25} />
            : el
        )
      }
    </Fragment>
  )
}

EmojiedText.propTypes = {
  text: PropTypes.string.isRequired,
}

export default EmojiedText
