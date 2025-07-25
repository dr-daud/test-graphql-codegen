import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface State {
  querySearchValue: string
}

const initialState: State = {
  querySearchValue: '',
}

export const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    setQuerySearchValue: (state, action: PayloadAction<string>) => {
      state.querySearchValue = action.payload
    },
  },
})

export const { setQuerySearchValue } = reposSlice.actions
export default reposSlice.reducer
