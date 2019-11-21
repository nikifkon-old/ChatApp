import React from 'react'
import {
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core'
import PropTypes from 'prop-types'

import { StyledTable } from './styles'
import { P, dark_cont1, dark_cont2, dark_cont } from '../../styles'

function ChatDetail({data}) {
  return (
    <StyledTable borderColor={dark_cont1}>
      <TableBody>
      {
        data && Object.keys(data).map(key =>
          <TableRow key={key}>
            <TableCell component="th">
              <P noMargin color={dark_cont}>{key}:</P>
            </TableCell>
            <TableCell component="th">
              <P noMargin color={dark_cont2}>{data[key]}</P>
            </TableCell>
          </TableRow>
        )
      }
      </TableBody>
    </StyledTable>
  );
}

ChatDetail.propTypes = {
  data: PropTypes.object,
};

export default ChatDetail;
