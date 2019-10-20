import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import {
  EmojiedText
} from '../index'
import {
  Grid,
  AvatarItem,
  UsernameItem,
  UnreadMessagesCounter,
  LastMessageItem,
  ElapsedTimeItem,
} from './styles'
import { P, dark_cont2 } from '../../styles'
import DefaultAvatar from '../../../assets/defaultAvatar.jpg'
import { getElapsedTime } from '../../utils'


const DialogCard = (props) => {
  const { dialog, setActiveDialog } = props
  const { last_message, id, interlocutor, unread_count } = dialog
  const { date, text } = last_message
  let { avatar, user } = interlocutor

  if (!avatar) {
    avatar = DefaultAvatar
  }

  const dispatch = useDispatch()

  function handleDialogDetails() {
    dispatch(setActiveDialog(id))
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
        {user}
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
  )
}

DialogCard.propTypes = {
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
    }).isRequired,
    unread_count: PropTypes.number.isRequired,
  }),
  setActiveDialog: PropTypes.func.isRequired,
}

export default DialogCard
