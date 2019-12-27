import axios from 'axios'

export const getUserDataService = user_id => {
  const LOGIN_API_ENDPOINT = `/api/v1/profile/${user_id}`
  
  return axios(LOGIN_API_ENDPOINT)
}

export const updateUserDataService = ({user_id, data}) => {
  const UPDATE_API_ENDPOINT = `/api/v1/profile/${user_id}`

  return axios.put(UPDATE_API_ENDPOINT, data)
}