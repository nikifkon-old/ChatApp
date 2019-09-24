import React, { Fragment } from 'react'
import { Popover as MaterialPopover } from '@material-ui/core'
import PropTypes from 'prop-types'

const Popover = (props) => {
  const {button: Button, modal: Modal,
    anchorOrigin,
    transformOrigin,
  } = props
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
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        <Modal />
      </MaterialPopover>
    </Fragment>
  )
}

Popover.defaultProps = {
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'center',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'center',
  },
}

Popover.propTypes = {
  button: PropTypes.func.isRequired,
  modal: PropTypes.func.isRequired,
  anchorOrigin: PropTypes.object.isRequired,
  transformOrigin: PropTypes.object.isRequired,
}

export default Popover
