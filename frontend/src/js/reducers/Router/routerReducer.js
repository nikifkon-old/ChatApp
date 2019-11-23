import { connectRouter } from 'connected-react-router'
import * as types from '../../actions'

const createRouterReducer = history => (state, action) => {
  switch (action.type) {
    case types.RESET_ROUTER_STATE:
      return {
        ...state,
        location: {
          ...state.location,
          state: {}
        }
      }
    default:
      return connectRouter(history)(state, action)
  }
}


export default createRouterReducer