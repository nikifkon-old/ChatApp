import styled from 'styled-components'
import { dark_bg1 } from '../../styles'

export const StyledHeader = styled.nav`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  top: ${props => props.show ? '0' : '-50px'};
  z-index: 9;
  height: 50px;
  background: ${dark_bg1};
  transition: .3s ease-out 0s top;
`
