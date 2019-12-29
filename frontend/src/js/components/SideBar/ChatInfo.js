import React from 'react'
import PropTypes from 'prop-types'

import DefaultAvatar from '../../../assets/defaultAvatar.jpg'
import { ContentGrid, H1, P, Img, Content } from '../../styles'

function ChatInfo({data}) {
  if(!data.avatar) {
    data.avatar = DefaultAvatar
  }
  if(!data.name) {
    data.name = 'not' 
  }
  return (
    <ContentGrid container
      direction="column"
      alignItems="center"
    >
      <Content>
        <Img src={data.avatar} width="150px" round alt="avatar"/>
        <H1 center>{data.name}</H1>
      </Content>
    </ContentGrid>
  );
}

ChatInfo.propTypes = {
  data: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
  })
};

export default ChatInfo;
