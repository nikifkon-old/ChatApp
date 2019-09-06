import React from 'react'
import PropTypes from 'prop-types'

import { TextField as MaterialTextField } from '@material-ui/core'

const TextField = ({
  input: { name, onChange, value, ...restInput },
  meta,
  ...rest
}) => (
  <MaterialTextField
    {...rest}
    name={name}
    helperText={meta.touched ? meta.error : undefined}
    error={meta.error && meta.touched}
    inputProps={restInput}
    onChange={onChange}
    value={value}
  />
)

TextField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
}

export default TextField