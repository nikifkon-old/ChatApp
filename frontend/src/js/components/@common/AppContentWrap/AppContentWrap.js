import React from 'react'

import { GridItem, ContentGrid } from '../../../styles'

function AppContentWrap({children}) {
  return (
    <GridItem
      column="3/5"
      component={ContentGrid}
      container
      direction="column"
      alignItems="center"
    >
      {children}
    </GridItem>
  )
}

export default AppContentWrap
