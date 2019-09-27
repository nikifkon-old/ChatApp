import axios from 'axios'
import BASE_URL, { getAuthHeaders } from '../index'

export const getDialogsDataService = user_id => {
  const GET_DIALOG_API_ENDPOINT = `http://${BASE_URL}/api/v1/dialog/?user_id=${user_id}`
  const headers = {
    'headers': {
      ...getAuthHeaders()
    }
  }
  return axios(GET_DIALOG_API_ENDPOINT, headers)
}

export const getMessagesInDialogService = dialog_id => {
  const GET_MESSAGES_IN_DIALOGS_API_ENDPOINT
   = `http://${BASE_URL}/api/v1/message/dialog/?dialog=${dialog_id}`
  const headers = {
    'headers': {
      ...getAuthHeaders()
    }
  }
  return axios(GET_MESSAGES_IN_DIALOGS_API_ENDPOINT, headers)
}
