import React, { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import PropTypes from 'prop-types'

import { getDialogDetails, setActiveDialog } from '../../actions/chatActions'
import {
  getDialogsInfo,
  getDialogsList,
  getNotEmptyDialogsData,
} from './selectors'
import {
  dialogSelectors,
  routerSelectors,
} from '../../selectors'
import { ColoredLine, Spinner } from '../../components'
import { Search, DialogCard } from '../../components/DialogList'
import { StyledFriendList } from './styles'
import { Btn, ContentGrid, P, dark_cont1 } from '../../styles'

const { getActiveDialog, getDialog } = dialogSelectors
const { getQueryParams } = routerSelectors

function DialogList() {
  const dispatch = useDispatch()

  // data
  const dialogs = useSelector(state => getDialogsInfo(state));
  const data = useSelector(state => {
    if (allowEmpty) {
      return getDialogsList(state)
    } else {
      return getNotEmptyDialogsData(state)
    }
  });
  const queryFilter = useSelector(state => getQueryParams(state));
  const { success, error } = dialogs;

  // get dialogs details
  const active = useSelector(state => getActiveDialog(state));
  const activeDialog = useSelector(state => getDialog(state, active))
  const hasMessages = dialog =>
    dialog && dialog.messages && dialog.messages.length === 0 ? false : true

  useEffect(() => {
    if (active !== null && !hasMessages(activeDialog)) {
      dispatch(getDialogDetails(active))
    }
  }, [active, activeDialog, dispatch])

  // allow dialogs without messages
  const [allowEmpty, setAllowEmpty] = useState(false);

  function handleAllowEmpty() {
    setAllowEmpty(!allowEmpty)
  }

  return (
    <StyledFriendList>
      <Search />
      {
        queryFilter === '' &&
          <Btn width="50%" onClick={handleAllowEmpty}>
            allow empty
          </Btn>
      }
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
                        setActiveDialog={setActiveDialog}
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
  );
}

// DialogList.propTypes = {
//   data: PropTypes.array.isRequired,
//   success: PropTypes.bool.isRequired,
//   fetching: PropTypes.bool.isRequired,
//   error: PropTypes.string,
//   getDialogDetails: PropTypes.func.isRequired,
// };

export default DialogList;
