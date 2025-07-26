import { useDispatch } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'

import { api } from '../app/api/baseApi'
import paginationReducer from './paginationSlice'
import sortReducer from './sortSlice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    paginationReducer,
    sortReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
