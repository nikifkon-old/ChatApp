import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { TextField, IconButton } from '../../index'
import { ContentGrid } from '../../../styles'

const SearchBar = ({search}) => {
  const [value, setValue] = useState()

  function handleSubmit(e) {
    e.preventDefault()
    search({
      filters: {
        name: value
      }
    })
  }

  function handleChange(e) {
    setValue(e.target.value)
  }

  return (
    <ContentGrid container
      component="form"
      wrap="nowrap"
      onSubmit={handleSubmit}
    >
      <TextField
        onChange={handleChange}
        name="search"
        variant="outlined"
        margin="dense"
        styled
      />
      <IconButton
        icon="search"
        type="submit"
      />
    </ContentGrid>
  )
}

SearchBar.propsTypes = {
  search: PropTypes.func.isRequired,
}

export default SearchBar 
