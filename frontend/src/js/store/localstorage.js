import jwt from 'jsonwebtoken'

export default function localStorageToReduxStore(state = {}) {
  const tokens = getTokensFromLocalStorage()
  const { access } = tokens
  const tokens_is_valid = checkTokensInLocalStorage(tokens)

  if (tokens_is_valid) {
    return {
      ...state,
      auth: {
        auth: {
          ...state.auth,
          user_id: getUserId(access),
          isAuth: tokens_is_valid,
          tokens
        }
      }
    }
  } else {
    return {...state}
  }
}

function checkTokensInLocalStorage(tokens) {
  const { access, refresh } = tokens
  if(!(access && refresh)){
    return false
  }
  try {
    // check signature by try get user_id
    jwt.decode(access)['user_id']
  } catch(error) {
    return false
  }
  return true
}

export function getUserId(access_token) {
  return jwt.decode(access_token)['user_id']
}

export function getTokensFromLocalStorage() {
  return {
    access: localStorage.getItem('access_token'),
    refresh: localStorage.getItem('refresh_token'),
  }
}
