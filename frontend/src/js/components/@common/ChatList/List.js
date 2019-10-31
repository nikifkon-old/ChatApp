import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  AllowEmptyBtn,
  Search,
  Card,
} from './index'
import {
  ColoredLine,
  Spinner,
} from '../../index'
import { StyledDialogList } from './styles'
import { ContentGrid, P, dark_cont1 } from '../../../styles'

function List(props) {
  const {
    listProps: {
      list,
      success,
      error,
    },
    cardProps,
    additionalBtnProps,
    getCardData
  } = props
  return (
    <StyledDialogList>
      <Search />
      <ColoredLine color={dark_cont1} />
      <AllowEmptyBtn {...additionalBtnProps} />
      {
        success
          ? list.length > 0
            ? <ContentGrid
                container
                direction="column"
              >
              {
                list.map(
                  card => (
                    <Fragment key={card.id}>
                      <Card
                        data={getCardData(card)}
                        {...cardProps}
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
  listProps: PropTypes.shape({
    list: PropTypes.array,
    success: PropTypes.bool.isRequired,
    error: PropTypes.object,
  }),
  additionalBtnProps: PropTypes.object.isRequired,
  cardProps: PropTypes.object.isRequired,
  getCardData: PropTypes.func.isRequired,
};

export default List;
