import axios from 'axios'

export const getUserDataService = user_id => {
  const LOGIN_API_ENDPOINT = `/api/v2/users/${user_id}`
  
  return axios(LOGIN_API_ENDPOINT)
}

export const updateUserDataService = ({user_id, data}) => {
  const UPDATE_API_ENDPOINT = `/api/v2/users/${user_id}`

  return axios.put(UPDATE_API_ENDPOINT, data)
}