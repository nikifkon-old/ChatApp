import React from 'react'
import PropTypes from 'prop-types'

import {
  EmojiedText
} from '../../index'
import {
  Grid,
  AvatarItem,
  UsernameItem,
  IconButtonItem,
  LastMessageItem,
  ElapsedTimeItem,
} from './styles'
import { dark_cont2 } from '../../../styles'
import DefaultAvatar from '../../../../assets/defaultAvatar.jpg'
import { getElapsedTime } from '../../../utils'


const FriendCard = (props) => {
  const { setActiveDialog } = props
  const { last_message, interlocutor } = props.dialog
  const { date, sender, text } = last_message
  let { avatar, user } = interlocutor

  if (!avatar) {
    avatar = DefaultAvatar
  }

  return (
    <Grid onClick={setActiveDialog}>
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
        {user}
      </UsernameItem>

      <IconButtonItem icon="more_horiz"/>

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
  )
}

FriendCard.propTypes = {
  dialog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    last_message: PropTypes.shape({
      sender: PropTypes.number,
      text: PropTypes.string,
      date: PropTypes.string,
    }),
    interlocutor: PropTypes.shape({
      user: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }).isRequired
  }),
  setActiveDialog: PropTypes.func.isRequired,
}

export default FriendCard
