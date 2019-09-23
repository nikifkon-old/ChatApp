import React, { Fragment } from 'react'
import { Popover as MaterialPopover } from '@material-ui/core'
import PropTypes from 'prop-types'

const Popover = ({button: Button, modal: Modal}) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Fragment>
      <Button
        handleClick={handleClick}
      />
      <MaterialPopover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Modal />
      </MaterialPopover>
    </Fragment>
  )
}

Popover.propTypes = {
  button: PropTypes.func.isRequired,
  modal: PropTypes.func.isRequired,
}

export default Popover
