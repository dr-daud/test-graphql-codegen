import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface State {
  after: string | null
  before: string | null
  page: number
  rowsPerPage: number
}

const initialState: State = {
  after: '',
  before: '',
  page: 0,
  rowsPerPage: 10,
}

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setAfter: (state, action: PayloadAction<string | null>) => {
      state.after = action.payload
    },
    setBefore: (state, action: PayloadAction<string | null>) => {
      state.before = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
  },
})

export const { setAfter, setBefore, setPage, setRowsPerPage } =
  paginationSlice.actions
export default paginationSlice.reducer
