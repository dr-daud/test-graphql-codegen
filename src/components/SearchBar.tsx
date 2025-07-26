import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setFinalQuery } from '@/store/sortSlice'
import { Button, Stack, TextField } from '@mui/material'

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('')

  const dispatch = useDispatch()

  return (
    <Stack
      sx={{
        backgroundColor: '#00838F',
        padding: '19px 0 19px 32px',
        flexDirection: 'row',
        gap: 1,
      }}
    >
      <TextField
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        variant="outlined"
        placeholder="Введите поисковый запрос"
        sx={{
          width: '912px',
          backgroundColor: '#fff',
          borderRadius: '4px',
          '& .MuiOutlinedInput-root': {
            height: 42,
          },
          '& .MuiOutlinedInput-input': {
            padding: 0,
            paddingLeft: 2,
          },
        }}
      />
      <Button
        variant="contained"
        sx={{ width: '105px' }}
        onClick={() => dispatch(setFinalQuery(searchValue))}
      >
        Искать
      </Button>
    </Stack>
  )
}

export default SearchBar
