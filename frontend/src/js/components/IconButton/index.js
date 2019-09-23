import React from 'react'
import { IconButton as MaterialIconButton } from '@material-ui/core'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { dark_active } from '../../styles'

const IconButton = ({icon, ...rest}) => {
  return (
    <StyledIconButton {...rest}>
      <i className="material-icons">
        {icon}
      </i>
    </StyledIconButton>
  )
}

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
}

const StyledIconButton = styled(
    ({borderRadius, backgroud, ...rest}) => <MaterialIconButton {...rest} />
  )`
  color: inherit;
  background: ${props => props.background || 'inherit'};
  border-radius: ${props => props.borderRadius || '50%'};
  &:hover {
    background: ${dark_active};
  }
`

export default IconButton
