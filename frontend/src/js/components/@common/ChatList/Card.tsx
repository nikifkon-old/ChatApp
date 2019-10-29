import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

// @ts-ignore
import { EmojiedText } from '../../index'
// @ts-ignore
import {
  Grid,
  AvatarItem,
  UsernameItem,
  UnreadMessagesCounter,
  LastMessageItem,
  ElapsedTimeItem,
} from './styles'
// @ts-ignore
import { P, dark_cont2 } from '../../../styles'
// @ts-ignore
import DefaultAvatar from '../../../../assets/defaultAvatar.jpg'
// @ts-ignore
import { getElapsedTime } from '../../../utils'

interface Card {
  data: DataCard;
  setActive: Function;
}

interface DataCard {
  last_message: Message;
  id: number;
  unread_count: number;
  title: string;
  avatar: string;
}

interface Message {
  date: string;
  text: string;
}

function Card(props : Card) {
  const { data, setActive } = props
  const { last_message, id, unread_count, title } = data
  const { date, text } = last_message

  let avatar = data.avatar
  if (!avatar) {
    avatar = DefaultAvatar
  }

  const dispatch = useDispatch()

  function handleDialogDetails() {
    dispatch(setActive(id))
  }

  return (
    <Grid onClick={handleDialogDetails}>
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
        color={dark_cont2}
        center
      >
        {/*{text.split(' ').slice(0, 8).join(' ') || 'No messages yet'}*/}
        <EmojiedText text={text}/>
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
