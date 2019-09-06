import axios from 'axios'
import BASE_URL from './index'

export const loginUserService = credentials => {
  const LOGIN_API_ENDPOINT = `${BASE_URL}/token-auth/jwt/create/`

  return axios.post(LOGIN_API_ENDPOINT, credentials)
}

export const singUpUserService = credentials => {
  const SINGUP_API_ENDPOINT = `${BASE_URL}/auth/users/`

  return axios.post(SINGUP_API_ENDPOINT, credentials)
}

export const refreshTokenService = refreshToken => {
  const REFRESH_TOKEN_API_ENDPOINT = `${BASE_URL}/token-auth/jwt/refresh/`
  const data = {
    refresh: refreshToken
  }

  return axios.post(REFRESH_TOKEN_API_ENDPOINT, data)
}

export const getAuthHeaders = () => {
  const access_token = localStorage.getItem('access_token')
  return {
    'Authorization': `JWT ${access_token}`
  }
}
