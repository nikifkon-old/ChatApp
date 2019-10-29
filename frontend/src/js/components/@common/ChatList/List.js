import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  AllowEmptyBtn,
  Search,
} from './index'
import {
  ColoredLine,
  Spinner,
} from '../../index'
import { StyledDialogList } from './styles'
import { ContentGrid, P, dark_cont1 } from '../../../styles'

function List(props) {
  const {
    data,
    success,
    error,
    handleAllowEmpty,
    card: Card
  } = props
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
                      <Card
                        data={dialog}
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

List.propTypes = {
  data: PropTypes.array,
  success: PropTypes.bool.isRequired,
  error: PropTypes.object,
  handleAllowEmpty: PropTypes.func.isRequired,
  card: PropTypes.func.isRequired,
};

export default List;
