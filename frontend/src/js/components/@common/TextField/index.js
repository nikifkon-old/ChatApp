import React from 'react'
import PropTypes from 'prop-types'

import { TextField as MaterialTextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.color.text.primary,
    width: '100%',
    '& div': {
      color: theme.color.text.primary
    },
    '& label': {
      color: theme.color.text.secondary
    },
    '& input': {
      // override -internal-autofill-selected by shadow
      '-webkit-box-shadow': `inset 0 0 0 50px ${theme.color.background.primary}`,
      '-webkit-text-fill-color': theme.color.text.secondary,
    },
    '& fieldset': {
      borderColor: theme.color.text.secondary
    },
    '& > div:hover > fieldset': {
      borderColor: theme.color.primary
    }
  }
}))

const TextField = ({
    styled,
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
  }) => {
  const classes = useStyles()

  return (
    <MaterialTextField
      {...rest}
      name={name}
      helperText={meta.touched ? meta.error : undefined}
      error={meta.error && meta.touched}
      inputProps={restInput}
      onChange={onChange}
      value={value}
      classes={styled && {root: classes.root}}
    />
  )
}

TextField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  styled: PropTypes.bool,
}

export default TextField
