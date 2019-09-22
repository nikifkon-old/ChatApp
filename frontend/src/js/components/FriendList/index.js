import React from 'react'
import PropTypes from 'prop-types'

import { dark_cont1 } from '../../styles'
import { StyledFriendList } from './styles'
import { ColoredLine, Spinner } from '../index'
import FriendListSearch from './FriendListSearch'
import FriendListResult from './FriendListResult'
import { withDialogsData } from '../../HOC/'

const FriendList = (props) => {
  const { dialogs, success, fetching, error, setActiveDialog } = props
  const result = !error ?
    (!fetching && success) ?
      <FriendListResult
        dialogs={dialogs}
        setActiveDialog={setActiveDialog}
      />
    : <Spinner />
    : <p>Error</p>

  return (
      <StyledFriendList>
        <FriendListSearch />
        <ColoredLine color={dark_cont1} />
        {result}
      </StyledFriendList>
  )
}

FriendList.propTypes = {
  dialogs: PropTypes.array.isRequired,
  success: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  setActiveDialog: PropTypes.func.isRequired,
}

export default withDialogsData(FriendList)
