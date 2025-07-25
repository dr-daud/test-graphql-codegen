import { useDispatch, useSelector } from 'react-redux'

import { setPage, setRowsPerPage } from '@/store/paginationSlice'
import { RootState } from '@/store/store'
import { TablePagination } from '@mui/material'

import { CustomPaginationActions } from './CustomPaginationActions'

const Pagination = () => {
  const { page, rowsPerPage } = useSelector(
    (state: RootState) => state.paginationReducer,
  )
  const dispatch = useDispatch()

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(setPage(newPage))
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newSize = parseInt(event.target.value, 10)
    dispatch(setRowsPerPage(newSize))
    dispatch(setPage(0))
  }

  return (
    <TablePagination
      component="div"
      ActionsComponent={CustomPaginationActions}
      count={-1}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      labelDisplayedRows={() => `Page ${page + 1}`}
    />
  )
}

export default Pagination
