import React from 'react'
import { Table,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core'
import PropTypes from 'prop-types'

import { P, dark_cont2, dark_cont } from '../../../styles'

const UserDetail = ({interlocutor}) => {
    let data = {
      tel: 'No',
      birth: 'No',
      gender: 'No',
      lang: 'No',
    }

    if (interlocutor) {
      const { gender, birth, tel, lang } = interlocutor
      if (gender) {
        data.gender = gender
      }
      if (birth) {
        data.birth = birth
      }
      if (tel) {
        data.tel = tel
      }
      if (lang) {
        data.lang = lang
      }
    }
    return (
        <Table>
          <TableBody>
          {
            Object.keys(data).map(key =>
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
        </Table>
    )
}

UserDetail.propTypes = {
  interlocutor: PropTypes.shape({
    tel: PropTypes.string,
    birth: PropTypes.string,
    gender: PropTypes.string,
    lang: PropTypes.string,
  })
}

export default UserDetail
