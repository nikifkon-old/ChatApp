export const getQueryParams = (state, query) => {
  const queryParams = state.router.location.search
  const filter = new URLSearchParams(queryParams).get(query)
  return filter
}

export const getRouterState = state => {
  return state.router.location.state
}