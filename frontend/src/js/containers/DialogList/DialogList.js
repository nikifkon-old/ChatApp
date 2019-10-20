import React, { useState, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import PropTypes from 'prop-types'

import { getDialogDetails } from '../../actions/chatActions'
import {
  getDialogsInfo,
  getDialogsList,
  getNotEmptyDialogsData,
} from './selectors'
import { ColoredLine, Spinner } from '../../components'
import { Search, DialogCard } from '../../components/DialogList'
import { StyledFriendList } from './styles'
import { Btn, ContentGrid, P, dark_cont1 } from '../../styles'

function DialogList() {
  const [allowEmpty, setAllowEmpty] = useState(false);
  const dispatch = useDispatch();
  const dialogs = useSelector(state => getDialogsInfo(state));
  const { success, error } = dialogs;

  const data = useSelector(state => {
    if (allowEmpty) {
      return getDialogsList(state)
    } else {
      return getNotEmptyDialogsData(state)
    }
  });

  function handleDialogDetails(args) {
    dispatch(getDialogDetails(args))
  }

  function handleAllowEmpty() {
    setAllowEmpty(!allowEmpty)
  }

  return (
    <StyledFriendList>
      <Search />
      <Btn width="50%" onClick={handleAllowEmpty}>
        allow empty
      </Btn>
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
                        getDialogDetails={handleDialogDetails}
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
