import styled from 'styled-components'

import { ContentGrid } from '../../styles'

export const StylesChatNav = styled(ContentGrid)`
  position: fixed;
  height: 100%;
  width: inherit;
  background: ${props => props.theme.color.background.primary};
  color: #fff;
`
