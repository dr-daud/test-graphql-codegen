import { useDispatch } from 'react-redux'

import { setAfter, setBefore } from '@/store/paginationSlice'
import { Button, Stack } from '@mui/material'
import { TablePaginationOwnProps } from '@mui/material/TablePagination'

export function CustomPaginationActions(props: TablePaginationOwnProps) {
  const { count, page, rowsPerPage, onPageChange, disabled } = props

  const dispatch = useDispatch()

  const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setAfter(null))
    console.log('maga')
  }

  const handleNext = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setBefore(null))
  }

  return (
    <Stack flexDirection={'row'}>
      <Button onClick={handleBack}>
        <img src="/left-arrow.svg" alt="left-arrow" />
      </Button>
      <Button onClick={handleNext}>
        <img src="/right-arrow.svg" alt="right-arrow" />
      </Button>
    </Stack>
  )
}
