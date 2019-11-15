import React from 'react';
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types';

import { ColoredLine } from '../../../index'
import { dark_cont1 } from '../../../../styles'
import { getQueryParams } from '../../../../selectors/RouterSelectors';

function NewMessagesLabel({id, firstUnread}) {
  const filter = useSelector(state => getQueryParams(state, 'filter'))

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
