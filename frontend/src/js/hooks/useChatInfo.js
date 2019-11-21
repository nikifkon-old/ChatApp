import { useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { getActiveDialog } from '../selectors/DialogSelectors'
import { getActiveGroup } from '../selectors/GroupSelectors'

const useChatInfo = () => {
  const { pathname }= useLocation()
  if (pathname.indexOf('messages') !== -1) {
    const data = useSelector(state => getActiveDialog(state))
    if (!data) {
      return [null, null]
    }
    const intrlc = data && data.interlocutor
    const name = intrlc && intrlc.user
    const avatar = intrlc && intrlc.avatar

    const details = {
      tel: intrlc && intrlc.tel,
      birth: intrlc && intrlc.birth,
      gender: intrlc && intrlc.gender,
    }
    return [
      {
        name,
        avatar
      },
      details
    ]
  } else if (pathname.indexOf('groups') !== -1) {
    const data = useSelector(state => getActiveGroup(state))
    if (!data) {
      return [null, null]
    }

    const name = data && data.name
    const avatar = data && data.img
    
    const details = {
      description: data && data.description,
      members: data && data.members.length
    }
    return [
      {
        name,
        avatar
      },
      details 
    ]
  } else {
    return [null, null]
  }
}

export default useChatInfo