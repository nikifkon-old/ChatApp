import axios from 'axios'
import BASE_URL, { getAuthHeaders } from '../index'

{/*
  list of
{
    "id": 1,
    "members": [
        {
          user_id,
          user,
          avatar,
        }
    ],
    "last_message": {
        "sender": 1,
        "text": "123",
        "date": "2019-08-12"
    }
}*/}
export const getDialogsDataService = user_id => {
  const GET_DIALOG_API_ENDPOINT = `${BASE_URL}/api/v1/dialog/?user_id=${user_id}`
  const headers = {
    'headers': {
      ...getAuthHeaders()
    }
  }
  return axios(GET_DIALOG_API_ENDPOINT, headers)
}

// list of
// {
//     "id": 1,
//     "sender": 1,
//     "dialog": 1,
//     "text": "123",
//     "date": "2019-08-12"
// },
export const getMessagesInDialogService = dialog_id => {
  const GET_MESSAGES_IN_DIALOGS_API_ENDPOINT
   = `${BASE_URL}/api/v1/message/dialog/?dialog=${dialog_id}`
  const headers = {
    'headers': {
      ...getAuthHeaders()
    }
  }
  return axios(GET_MESSAGES_IN_DIALOGS_API_ENDPOINT, headers)
}
