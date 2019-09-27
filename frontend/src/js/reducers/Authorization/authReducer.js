import * as types from '../../actions'
import { getTokensFromLocalStorage, getUserId } from '../../store/localstorage'

const initialState = {
  tokens: {
    access: null,
    refresh: null
  },
  user_id: null,
  isAuth: false,
  // refresh token request
  fetching: false,
  success: false,
  error: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SET_JWT_TOKENS:
      localStorage.setItem('refresh_token', action.payload.refresh)
      localStorage.setItem('access_token', action.payload.access)

      return {
        ...state,
        isAuth: true,
        tokens: action.payload
      }

    case types.SET_USER_ID: {
      const { access } = getTokensFromLocalStorage()
      const user_id = getUserId(access)
      return {
        ...state,
        user_id,
      }
    }

    case types.REFRESH_ACCESS_TOKEN_REQUEST:
      return {
        ...state,
        fetching: true,
      }

    case types.REFRESH_ACCESS_TOKEN_SUCCESS:
      localStorage.setItem('access_token', action.payload.access)

      return {
        ...state,
        fetching: false,
        success: true,
        error: null,
        tokens: {
          ...state.tokens,
          access: action.payload.access
        }
      }

    case types.REFRESH_ACCESS_TOKEN_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload
      }

    case types.LOGOUT_USER:
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')

      return {
        ...state,
        ...initialState
      }
    default:
      return state
  }
}
