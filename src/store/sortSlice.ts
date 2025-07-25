import { TSortDirection, TSortField } from '@/types/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface State {
  selectedRepo: string
  sortDirection: TSortDirection
  sortField: TSortField
}

const initialState: State = {
  selectedRepo: '',
  sortDirection: 'desc',
  sortField: null,
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
    },
    setSortField: (state, action: PayloadAction<TSortField>) => {
      state.sortField = action.payload
    },
  },
})

export const { setSelectedRepo, setSortDirection, setSortField } =
  sortSlice.actions
export default sortSlice.reducer
