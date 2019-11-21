import { useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { getActiveDialog } from '../selectors/DialogSelectors'
import { getActiveGroup } from '../selectors/GroupSelectors'

const useChatInfo = () => {
  const { pathname }= useLocation()
  if (pathname.indexOf('messages') !== -1) {
    const data = useSelector(state => getActiveDialog(state))
    if (!data) {
      return null
    }

    const name = data && data.interlocutor && data.interlocutor.user
    const avatar = data && data.interlocutor && data.interlocutor.avatar

    return {
      name,
      avatar
    }
  } else if (pathname.indexOf('groups') !== -1) {
    const data = useSelector(state => getActiveGroup(state))
    if (!data) {
      return null
    }

    const name = data && data.name
    const avatar = data && data.img

    return {
      name,
      avatar
    }
  } else {
    return null
  }
}

export default useChatInfo