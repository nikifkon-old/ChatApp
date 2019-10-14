import React from 'react'
import {
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core'
import PropTypes from 'prop-types'

import { StyledTable } from './styles'
import { P, dark_cont1, dark_cont2, dark_cont } from '../../styles'

function ChatDetail({dialog}) {
  let interlocutor = dialog.interlocutor

  return (
    <StyledTable borderColor={dark_cont1}>
      <TableBody>
      {
        Object.keys(interlocutor).map(key =>
          <TableRow key={key}>
            <TableCell component="th">
              <P noMargin color={dark_cont}>{key}:</P>
            </TableCell>
            <TableCell component="th">
              <P noMargin color={dark_cont2}>{interlocutor[key]}</P>
            </TableCell>
          </TableRow>
        )
      }
      </TableBody>
    </StyledTable>
  );
}

ChatDetail.propTypes = {
  dialog: PropTypes.shape({
    interlocutor: PropTypes.shape({
      tel: PropTypes.string,
      birth: PropTypes.string,
      gender: PropTypes.string,
      lang: PropTypes.string,
    })
  })
};

ChatDetail.defaultProps = {
  dialog: {
    interlocutor: {
      tel: 'No',
      birth: 'No',
      gender: 'No',
      lang: 'No',
    }
  }
}

export default ChatDetail;
