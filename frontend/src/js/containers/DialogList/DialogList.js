import React, { useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
// import PropTypes from 'prop-types'

import { setActiveDialog } from '../../actions/chatActions'
import {
  getDialogsInfo,
  getDialogsList,
  getNotEmptyDialogsData,
} from './selectors'
import { ColoredLine, Spinner } from '../../components'
import {
  Search,
  DialogCard,
  AllowEmptyBtn,
} from '../../components/DialogList'
import { StyledDialogList } from './styles'
import { ContentGrid, P, dark_cont1 } from '../../styles'


function DialogList() {
  // allow dialogs without messages
  const [allowEmpty, setAllowEmpty] = useState(false);

  function handleAllowEmpty() {
    setAllowEmpty(!allowEmpty)
  }

  // data
  const dialogs = useSelector(state => getDialogsInfo(state));
  const { success, error } = dialogs;
  const data = useSelector(state => {
    if (allowEmpty) {
      return getDialogsList(state)
    } else {
      return getNotEmptyDialogsData(state)
    }
  });

  return (
    <StyledDialogList>
      <Search />
      <ColoredLine color={dark_cont1} />
      <AllowEmptyBtn handleAllowEmpty={handleAllowEmpty} />
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
    </StyledDialogList>
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
