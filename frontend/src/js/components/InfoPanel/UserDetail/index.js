import React from 'react'
import { Table, 
  TableBody, 
  TableRow, 
  TableCell
} from '@material-ui/core'
import PropTypes from 'prop-types'

import { P } from '../../../styles'

const UserDetail = ({nickname, tel, date, gender, lang}) => {
    const data = {nickname, tel, date, gender, lang}

    return (
        <Table>
          <TableBody>
          {
            Object.keys(data).map(key => 
              <TableRow key={key}>
              <TableCell component="th">
                <P noMargin>{key}:</P>
              </TableCell>
              <TableCell component="th">
                <P noMargin color="#555">{data[key]}</P>
              </TableCell>
            </TableRow>
            )
          }       
          </TableBody>
        </Table>
    )
}

UserDetail.propTypes = {
  nickname: PropTypes.string,
  tel: PropTypes.string,
  date: PropTypes.string,
  gender: PropTypes.string,
  lang: PropTypes.string,
}

export default UserDetail