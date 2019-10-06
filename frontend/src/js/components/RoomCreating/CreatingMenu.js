import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { Content, Btn, P } from '../../styles'

const CreatingMenu = ({handleForm, setHeader}) => {
  function handleDialogForm() {
    handleForm('DIALOG')
    setHeader('Create dialog: ')
  }

  function handleGroupForm() {
    handleForm('GROUP')
    setHeader('Create group: ')
  }

  function handleChannelForm() {
    handleForm('CHANNEL')
    setHeader('Create channel: ')
  }

  return (
    <Fragment>
    <Btn onClick={handleDialogForm}>
      <i className="material-icons">
        person_add
      </i>
      <Content>
        <P>Dialog</P>
      </Content>
    </Btn>

    <Btn onClick={handleGroupForm}>
      <i className="material-icons">
        group_add
      </i>
      <Content>
        <P>Group</P>
      </Content>
    </Btn>

    <Btn onClick={handleChannelForm}>
      <i className="material-icons">
        group_add
      </i>
      <Content>
        <P>Channel</P>
      </Content>
    </Btn>
    </Fragment>
  )
}

CreatingMenu.propTypes = {
  handleForm: PropTypes.func.isRequired,
  setHeader: PropTypes.func.isRequired,
}

export default CreatingMenu
