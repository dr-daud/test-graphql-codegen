import { useDispatch, useSelector } from 'react-redux'

import { useSearchRepositoriesQuery } from '@/app/api/generated'
import { setAfter, setBefore } from '@/store/paginationSlice'
import { RootState } from '@/store/store'
import { Button, Stack } from '@mui/material'
import { TablePaginationOwnProps } from '@mui/material/TablePagination'

export function CustomPaginationActions(props: TablePaginationOwnProps) {
  const { count, page, rowsPerPage, onPageChange, disabled } = props
  const { after, before } = useSelector(
    (state: RootState) => state.paginationReducer,
  )

  const { data } = useSearchRepositoriesQuery(
    { query: finalQuery, first: rowsPerPage, before: before, after: after },
    { skip: !finalQuery },
  )

  const dispatch = useDispatch()

  const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setAfter(null))
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
