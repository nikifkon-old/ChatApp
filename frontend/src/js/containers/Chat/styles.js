import styled from 'styled-components'

import {
  withHeaderStatus,
} from '../../HOC'

// Containers
export const StyledChat = withHeaderStatus(styled.div`
  color: ${props => props.color || 'inherit'};
  height: calc(100vh ${props => props.headerIsOpen && '- 50px'});
  position: fixed;
  width: 550px;
  display: grid;
  grid-template-rows: 70px 1fr 70px;
  transition: .3s ease-out 0s max-height;
`)
