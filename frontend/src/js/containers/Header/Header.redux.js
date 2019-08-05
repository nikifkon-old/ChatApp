import { createSlice } from 'redux-starter-kit'

const HeaderSlice = createSlice({
  slice: "@Header",
  initialState: {
    isOpen: true
  },
  reducers: {
    handleHeader: (state) => {
      state.isOpen = !state.isOpen
    }
  }
})

const { actions: HeaderActions, reducer } = HeaderSlice

const HandleHeader = () => dispatch => {
  dispatch(HeaderActions.handleHeader())
}

const actions = {
  HandleHeader
}

export {
  reducer as default,
  actions
}