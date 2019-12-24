import axios from 'axios'
import BASE_URL, { getAuthHeaders } from './index'

export const getUserDataService = user_id => {
  const LOGIN_API_ENDPOINT = `http://${BASE_URL}/api/v1/profile/${user_id}`
  const headers = {
    'headers': {
      ...getAuthHeaders()
    }
  }

  return axios(LOGIN_API_ENDPOINT, headers)
}

export const updateUserDataService = ({user_id, data}) => {
  const UPDATE_API_ENDPOINT = `http://${BASE_URL}/api/v1/profile/${user_id}`
  const headers = {
    'headers': {
      ...getAuthHeaders()
    }
  }

  return axios.put(UPDATE_API_ENDPOINT, data, headers)
}