import React from 'react'
import PropTypes from 'prop-types'

import { TextField as MaterialTextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.color.text.primary,
    width: '100%',
    '& .MuiInputBase-root': {
      color: theme.color.text.primary,
      '& fieldset': {
        borderColor: theme.color.text.secondary
      },
      '&:hover fieldset': {
        borderColor: theme.color.primary
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.color.primary
      }
    },
    '& label': {
      color: theme.color.text.secondary
    },
    '& input': {
      // override -internal-autofill-selected by shadow
      '-webkit-box-shadow': `inset 0 0 0 50px ${theme.color.background.primary}`,
      '-webkit-text-fill-color': theme.color.text.secondary,
    },
  }
}))

const FinalFormTextField = ({
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

const TextField = ({styled, ...rest}) => {
  const classes = useStyles()

  return (
    <MaterialTextField
      classes={styled && {root: classes.root}}
      {...rest}
    />
  )
}

FinalFormTextField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  styled: PropTypes.bool,
}

export {
  FinalFormTextField as default,
  TextField
}
