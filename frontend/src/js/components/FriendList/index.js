import React from 'react'
import PropTypes from 'prop-types'

import { dark_cont1 } from '../../styles'
import { StyledFriendList } from './styles'
import { ColoredLine } from '..'
import FriendListSearch from './FriendListSearch'
import FriendListResult from './FriendListResult'

const FriendList = ({dialogs}) => {
    return (
        <StyledFriendList>
          <FriendListSearch />
          <ColoredLine color={dark_cont1} />
          <FriendListResult dialogs={dialogs} />
        </StyledFriendList>
    )
}

FriendList.propTypes = {
  dialogs: PropTypes.array.isRequired
}

export default FriendList