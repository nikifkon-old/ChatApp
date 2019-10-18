import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getDialogDetails } from '../../actions/chatActions'
import { getDialogs } from '../../reducers/selectors'
import { ColoredLine, Spinner } from '../../components'
import { Search, DialogCard } from '../../components/DialogList'
import { StyledFriendList } from './styles'
import { ContentGrid, P, dark_cont1 } from '../../styles'

function DialogList(props) {
  const { data, success, error, getDialogDetails } = props

  return (
    <StyledFriendList>
      <Search />
      <ColoredLine color={dark_cont1} />
      {
        success
          ? data.length > 0
            ? <ContentGrid
                container
                direction="column"
              >
              {
                data.map(
                  dialog => (
                    <Fragment key={dialog.id}>
                      <DialogCard
                        dialog={dialog}
                        getDialogDetails={getDialogDetails}
                      />
                      <ColoredLine color={dark_cont1} width="50%" />
                    </Fragment>
                  )
                )
              }
              </ContentGrid>
              : <P center>have not dialog yet...</P>
          : error
            ? <P>Error {error}</P>
            : <Spinner />
      }
    </StyledFriendList>
  )
}

DialogList.propTypes = {
  data: PropTypes.array.isRequired,
  success: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.string,
  getDialogDetails: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  const dialogs = getDialogs(state)
  // console.log(getUnreadCount(state));

  return {
    data: dialogs.data,
    fetching: dialogs.fetching,
    success: dialogs.success,
    error: dialogs.error,
  }
}

export default connect(
  mapStateToProps, {
  getDialogDetails
})(DialogList)
