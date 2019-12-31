export const getTokens = state => state.auth.auth.tokens
export const hasTokens = state => !!state.auth.auth.tokens.access && !!state.auth.auth.tokens.refresh

export const getIsSuccessUserData = state => state.auth.user.success

export const getUserId = state => state.auth.auth.user_id
export const getUserInfo = state => state.auth.user.data

export const getLoginStatus = state => {
  if (state.auth.login.success) {
    return 200
  } else if (state.auth.login.error) {
    return state.auth.login.error.status 
  }
}

export const getSingUpStatus = state => {
  if (state.auth.singup.success) {
    return 200
  } else if (state.auth.singup.error) {
    return state.auth.singup.error.status 
  }
}