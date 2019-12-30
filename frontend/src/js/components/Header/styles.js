import styled from 'styled-components'

import {
  withHeaderStatus
} from '../../HOC'

export const StyledHeader = withHeaderStatus(styled.nav`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  top: ${props => props.headerIsOpen ? '0' : '-50px'};
  z-index: 9;
  height: 50px;
  color: ${props => props.theme.color.text.primary};
  background: ${props => props.theme.color.background.primary};
  transition: .3s ease-out 0s top;
`)
