import { TSortDirection, TSortField } from '@/types/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const buildFinalQuery = (
  querySearchValue: string,
  sortField: TSortField,
  sortDirection: TSortDirection,
): string => {
  let query = querySearchValue.trim()
  if (sortField) {
    query += ` sort:${sortField}-${sortDirection}`
  }
  return query
}

interface State {
  selectedRepo: string
  sortDirection: TSortDirection
  sortField: TSortField
  querySearchValue: string
  finalQuery: string
}

const initialState: State = {
  selectedRepo: '',
  sortDirection: 'desc',
  sortField: null,
  querySearchValue: '',
  finalQuery: '',
}

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSelectedRepo: (state, action: PayloadAction<string>) => {
      state.selectedRepo = action.payload
    },
    setSortDirection: (state, action: PayloadAction<TSortDirection>) => {
      state.sortDirection = action.payload
      state.finalQuery = buildFinalQuery(
        state.querySearchValue,
        state.sortField,
        state.sortDirection,
      )
    },
    setSortField: (state, action: PayloadAction<TSortField>) => {
      state.sortField = action.payload
      state.finalQuery = buildFinalQuery(
        state.querySearchValue,
        state.sortField,
        state.sortDirection,
      )
    },
    setQuerySearchValue: (state, action: PayloadAction<string>) => {
      state.querySearchValue = action.payload
      state.finalQuery = buildFinalQuery(
        state.querySearchValue,
        state.sortField,
        state.sortDirection,
      )
    },
    setFinalQuery: (state, action: PayloadAction<string>) => {
      state.querySearchValue = action.payload
      state.finalQuery = buildFinalQuery(
        action.payload,
        state.sortField,
        state.sortDirection,
      )
    },
  },
})

export const {
  setSelectedRepo,
  setSortDirection,
  setSortField,
  setQuerySearchValue,
  setFinalQuery,
} = sortSlice.actions

export default sortSlice.reducer
