import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { IconButton } from '../index'
import DefaultAvatar from '../../../assets/defaultAvatar.jpg'
import { ContentGrid, H1, P, Img } from '../../styles'

function ChatInfo({data}) {
  if(!data.avatar) {
    data.avatar = DefaultAvatar
  }
  if(!data.name) {
    data.name = 'not' 
  }
  return (
    <Fragment>
      <ContentGrid container
        justify="flex-end"
        alignItems="center"
      >
        <IconButton icon="more_horiz" size="small" />
      </ContentGrid>

      <ContentGrid container
        direction="column"
        alignItems="center"
      >
        <Img src={data.avatar} width="150px" round alt="avatar"/>
        <H1>{data.name}</H1>
      </ContentGrid>
    </Fragment>
  );
}

ChatInfo.propTypes = {
  data: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
  })
};

export default ChatInfo;
