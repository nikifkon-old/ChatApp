export const getTokens = state => state.auth.auth.tokens
export const hasTokens = state => !!state.auth.auth.tokens.access && !!state.auth.auth.tokens.refresh

export const getIsSuccessUserData = state => state.auth.user.success

export const getUserId = state => state.auth.auth.user_id
export const getUserInfo = state => state.auth.user.data