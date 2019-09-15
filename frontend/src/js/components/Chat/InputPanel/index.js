import React from 'react'
import PropTypes from 'prop-types'

import { StyledInputPanel, MainInput } from '../styles'
import { IconBtn } from '../../../styles'

const InputPanel = (props) => {
  return (
    <StyledInputPanel>
      <IconBtn>
        <i className="material-icons">
          attach_file
        </i>
      </IconBtn>
      <div>
        <MainInput
          variant="outlined"
          margin="normal"
        />
      </div>
      <IconBtn>
        <i className="material-icons">
          insert_emoticon
        </i>
      </IconBtn>
      <IconBtn>
        <i className="material-icons">
          send
        </i>
      </IconBtn>
    </StyledInputPanel>
  )
}

export default InputPanel
