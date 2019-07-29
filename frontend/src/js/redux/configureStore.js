import { configureStore, getDefaultMiddleware  } from 'redux-starter-kit'

import rootReducer from '../containers/rootReducer'

const configureAppStore = preloaderState => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: [...getDefaultMiddleware()],
        devtools: {},
        preloaderState
    })
    return store
}

export default configureAppStore