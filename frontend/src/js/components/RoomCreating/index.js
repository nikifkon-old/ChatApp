import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'

import DialogForm from './DialogForm'
import CreatingMenu from './CreatingMenu'
import { ColoredLine } from '../index'
import { H4, dark_cont1 } from '../../styles'

const RoomCreating = ({createDialog}) => {
  const [activeForm, setActiveForm] = useState('MENU')
  const [header, setHeader] = useState('Create: ')
  return (
    <Fragment>
      <H4 center>{header}</H4>
      <ColoredLine color={dark_cont1} />
      {
        {
          'MENU': (
            <CreatingMenu
              handleForm={setActiveForm}
              setHeader={setHeader}
            />
          ),
          'DIALOG': (
            <DialogForm createDialog={createDialog} />
          ),
          'GROUP': (
            <div />
          ),
          'CHANNEL': (
            <div />
          )
        }[activeForm]
      }
    </Fragment>
  )
}

RoomCreating.propTypes = {
  createDialog: PropTypes.func.isRequired,
}

export default RoomCreating
