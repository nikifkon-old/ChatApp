import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import {
  EmojiedText
} from '../../index'
import {
  CardGrid,
  AvatarItem,
  UsernameItem,
  UnreadMessagesCounter,
  LastMessageItem,
  ElapsedTimeItem,
} from './styles'
import { P } from '../../../styles'
import DefaultAvatar from '../../../../assets/defaultAvatar.jpg'
import { getElapsedTime } from '../../../utils'

function Card(props) {
  const { data, setActive } = props
  const { last_message, id, unread_count, title } = data
  const { date, text } = last_message

  let avatar = data.avatar
  if (!avatar) {
    avatar = DefaultAvatar
  }

  const dispatch = useDispatch()

  function handleActive() {
    dispatch(setActive(id))
  }

  return (
    <CardGrid onClick={handleActive}>
      <AvatarItem
        src={avatar}
        round
        width="60px"
        alt=""
      />

      <UsernameItem
        bold
        center
      >
        {title}
      </UsernameItem>

      {
        unread_count !== 0 && (
          <UnreadMessagesCounter>
            <P center>{unread_count}</P>
          </UnreadMessagesCounter>
        )
      }

      <LastMessageItem
        center
      >
        <EmojiedText text={text}/>
      </LastMessageItem>
      {
        last_message && last_message.date &&
        <ElapsedTimeItem
          color="secondary"
          >
          {getElapsedTime(date)} ago
        </ElapsedTimeItem>
      }
    </CardGrid>
  );
}

Card.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    last_message: PropTypes.shape({
      sender: PropTypes.number,
      text: PropTypes.string,
      date: PropTypes.string,
    }),
    unread_count: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }),
  setActive: PropTypes.func.isRequired,
}

export default Card;
