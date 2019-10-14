import React from 'react'
import { Table } from '@material-ui/core'
import styled from 'styled-components'

export const StyledTable = styled(({borderColor, ...rest}) => <Table {...rest} />)`
  & > tbody > tr > th {
    border-color: ${props => props.borderColor || 'inherit'};
  }
`

export const StyledChatLogo = styled.img`
  border-radius: 50%
`
