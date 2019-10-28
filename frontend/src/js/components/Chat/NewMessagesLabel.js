import React from 'react';
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types';

import {
  routerSelectors,
  dialogSelectors,
} from '../../selectors'
import { ColoredLine } from '../index'
import { dark_cont1 } from '../../styles'

const { getQueryParams} = routerSelectors
const { getFirstUnread } = dialogSelectors

function NewMessagesLabel({id}) {
  const filter = useSelector(state => getQueryParams(state, 'filter'))
  const firstUnread = useSelector(state => getFirstUnread(state))

  if (id === firstUnread && filter !== 'stared') {
    return (
      <ColoredLine
        color={dark_cont1}
        text="New Messages:"
      />
    );
  } else {
    return null
  }
}

NewMessagesLabel.propTypes = {
  id: PropTypes.number.isRequired,
  firstUnread: PropTypes.number,
};

export default NewMessagesLabel;
