import { configureStore } from '@reduxjs/toolkit'

import userLogReducer from './reducers/userLogReducer'
import uiReducer from './reducers/uiReducer'
import filterReducer from './reducers/filterReducer'

import userReducer from './reducers/usersReducer';

const store = configureStore({
  reducer: {
    ui: uiReducer.reducer,
    userLog: userLogReducer.reducer,
    filter: filterReducer.reducer,
    user: userReducer.reducer,
  },
})

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
