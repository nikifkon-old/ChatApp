import React from 'react'
import {
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core'
import PropTypes from 'prop-types'

import { StyledTable } from './styles'
import { P } from '../../styles'

function ChatDetail({data}) {
  return (
    <StyledTable>
      <TableBody>
      {
        data && Object.keys(data).map(key =>
          <TableRow key={key} size="small">
            <TableCell padding="none" component="th">
              <P color="primary">{key}:</P>
            </TableCell>
            <TableCell padding="none" component="th">
              <P color="secondary">{data[key]}</P>
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
