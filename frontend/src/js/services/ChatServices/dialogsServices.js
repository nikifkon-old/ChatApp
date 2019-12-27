import axios from 'axios'
import BASE_URL from '../index'

export const getDialogsDataService = user_id => {
  const GET_DIALOG_API_ENDPOINT = `http://${BASE_URL}/api/v1/dialog/?user_id=${user_id}`

  return axios(GET_DIALOG_API_ENDPOINT)
}

export const getMessagesInDialogService = dialog_id => {
  const GET_MESSAGES_IN_DIALOGS_API_ENDPOINT = `http://${BASE_URL}/api/v1/dialog/messages/?dialog=${dialog_id}`

  return axios(GET_MESSAGES_IN_DIALOGS_API_ENDPOINT)
}
