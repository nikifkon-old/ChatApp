import React from 'react'
import { IconButton as MaterialIconButton } from '@material-ui/core'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const IconButton = ({icon, color, borderRadius, backgroud, ...rest}) => {
  return (
    <StyledIconButton
      color={color}
      borderRadius={borderRadius}
      background={backgroud}
      {...rest}
    >
      <i className="material-icons">
        {icon}
      </i>
    </StyledIconButton>
  );
}

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["active", "normal"]),
  borderRadius: PropTypes.string,
  backgroud: PropTypes.string,
};

const StyledIconButton = styled(
    ({borderRadius, backgroud, color, ...rest}) => <MaterialIconButton {...rest} />
  )`
  color: ${props => props.color === "active"
    ? props.theme.color.primary
    : props.theme.color.text.secondary
  };
  background: ${props => props.background || 'inherit'};
  border-radius: ${props => props.borderRadius || '50%'};
  &:hover {
    background: ${props => props.theme.color.primary};
    color: ${props => props.theme.color.text.primary}
  }
`;

export default IconButton;
