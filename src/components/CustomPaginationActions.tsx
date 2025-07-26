import { useDispatch, useSelector } from 'react-redux'

import { useSearchRepositoriesQuery } from '@/app/api/generated'
import { setAfter, setBefore, setPage } from '@/store/paginationSlice'
import { RootState } from '@/store/store'
import { Button, Stack } from '@mui/material'
import { TablePaginationOwnProps } from '@mui/material/TablePagination'

export function CustomPaginationActions(props: TablePaginationOwnProps) {
  const { count, page, rowsPerPage, disabled } = props
  const { after, before } = useSelector(
    (state: RootState) => state.paginationReducer,
  )

  const { finalQuery } = useSelector((state: RootState) => state.sortReducer)

  const dispatch = useDispatch()

  const { data } = useSearchRepositoriesQuery(
    { query: finalQuery, first: rowsPerPage, before: before, after: after },
    { skip: !finalQuery },
  )

  const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (data?.search.pageInfo.hasPreviousPage) {
      dispatch(setAfter(null))
      dispatch(setBefore(data?.search.pageInfo.endCursor))
      dispatch(setPage(page - 1))
    }
  }

  const handleNext = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (data?.search.pageInfo.hasNextPage) {
      dispatch(setBefore(null))
      dispatch(setAfter(data?.search.pageInfo.startCursor))
      dispatch(setPage(page + 1))
    }
  }

  return (
    <Stack flexDirection={'row'}>
      <Button
        onClick={handleBack}
        // disabled={data?.search.pageInfo.hasPreviousPage}
      >
        <img src="/left-arrow.svg" alt="left-arrow" />
      </Button>
      <Button
        onClick={handleNext}
        //  disabled={data?.search.pageInfo.hasNextPage}
      >
        <img src="/right-arrow.svg" alt="right-arrow" />
      </Button>
    </Stack>
  )
}
