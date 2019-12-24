import React from 'react'
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core'

function GenderRadio({input}) {
  function handleChange(e) {
    input.onChange(e.target.value)
  }

  return (
    <RadioGroup
      aria-label="gender"
      name={input.name}
      value={input.value}
      onChange={handleChange}
    >
      <FormControlLabel value="female" control={<Radio />} label="Famale" />
      <FormControlLabel value="male" control={<Radio />} label="Male" />
    </RadioGroup>
  )
}

export default GenderRadio