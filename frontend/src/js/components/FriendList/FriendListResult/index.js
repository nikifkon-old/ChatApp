import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import FriendCard from '../FriendCard'
import { ColoredLine } from '../..'
import { ContentGrid, dark_cont1 } from '../../../styles'

const FriendListResult = ({dialogs, setActiveDialog}) => {
  return (
    <ContentGrid container
      direction="column"
    >
      {
        dialogs.map(dialog =>
          (
            <Fragment key={dialog.id}>
              <FriendCard
                dialog={dialog}
                setActiveDialog={() => setActiveDialog(dialog.id)}
              />
              <ColoredLine color={dark_cont1} width="50%" />
            </Fragment>
          )
        )
      }
    </ContentGrid>
  )
}

FriendListResult.propTypes = {
  dialogs: PropTypes.array.isRequired,
  setActiveDialog: PropTypes.func.isRequired,
}

export default FriendListResult
