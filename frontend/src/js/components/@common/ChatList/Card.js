import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import {
  EmojiedText
} from '../../index'
import {
  Grid,
  AvatarItem,
  UsernameItem,
  UnreadMessagesCounter,
  LastMessageItem,
  ElapsedTimeItem,
} from './styles'
import { P, dark_cont2 } from '../../../styles'
import DefaultAvatar from '../../../../assets/defaultAvatar.jpg'
import { getElapsedTime, getOneLineText } from '../../../utils'

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

  const lastMessageId = `last_message_${id}`

  return (
    <Grid onClick={handleActive}>
      <AvatarItem
        src={avatar}
        round
        width="60px"
        alt=""
      />

      <UsernameItem
        color="#fff"
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
        id={lastMessageId}
        color={dark_cont2}
        center
      >
        <EmojiedText text={getOneLineText(text, lastMessageId)}/>
      </LastMessageItem>
      {
        last_message && last_message.date &&
        <ElapsedTimeItem
          color={dark_cont2}
          >
          {getElapsedTime(date)} ago
        </ElapsedTimeItem>
      }
    </Grid>
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
