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
      fetching,
      errorMessage,
      error,
    },
    cardProps,
    additionalBtnProps,
    getCardData
  } = props

  if (error) {
    return <P>Error {error}</P>
  } else if (fetching) {
    return <Spinner />
  }

  return (
    <StyledDialogList>
      <Search />
      <ColoredLine color={dark_cont1} />
      <AllowEmptyBtn {...additionalBtnProps} />
      {
        list.length > 0
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
          : <P center>{errorMessage}</P>
      }
    </StyledDialogList>
  );
}

List.propTypes = {
  listProps: PropTypes.shape({
    list: PropTypes.array,
    fetching: PropTypes.bool.isRequired,
    error: PropTypes.object,
  }),
  additionalBtnProps: PropTypes.object,
  cardProps: PropTypes.object.isRequired,
  getCardData: PropTypes.func.isRequired,
};

export default List;
