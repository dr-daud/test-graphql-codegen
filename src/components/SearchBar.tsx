import { Button, Stack, TextField } from '@mui/material'

interface Props {
  searchValue: string
  setSearchValue: (value: string) => void
  setQuerySearchValue: (value: string) => void
}

const SearchBar = ({
  searchValue,
  setSearchValue,
  setQuerySearchValue,
}: Props) => {
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
        }}
      />
      <Button
        variant="contained"
        sx={{ width: '105px' }}
        onClick={() => setQuerySearchValue(searchValue)}
      >
        Искать
      </Button>
    </Stack>
  )
}

export default SearchBar
