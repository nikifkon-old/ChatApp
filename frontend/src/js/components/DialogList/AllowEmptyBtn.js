import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  routerSelectors,
} from '../../selectors'
import { Btn } from '../../styles'

const { getQueryParams } = routerSelectors

function AllowEmptyBtn({handleAllowEmpty}) {
  const filter = useSelector(state => getQueryParams(state, 'filter'));

  if (filter === null) {
    return (
      <Btn width="50%" onClick={handleAllowEmpty}>
        allow empty
      </Btn>
    )
  } else {
    return null
  }
}

AllowEmptyBtn.propTypes = {
  handleAllowEmpty: PropTypes.func.isRequired,
};

export default AllowEmptyBtn;
