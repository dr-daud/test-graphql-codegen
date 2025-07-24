import { SearchRepositoriesQuery } from '@/app/api/generated'
import { TablePagination } from '@mui/material'

interface Props {
  page: number
  setPage: (number: number) => void
  rowsPerPage: number
  setRowsPerPage: (number: number) => void
  data?: SearchRepositoriesQuery
  setCursors: (arg: (string | null)[]) => void
}

const Pagination = ({
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  data,
  setCursors,
}: Props) => {
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newSize = parseInt(event.target.value, 10)
    setRowsPerPage(newSize)
    setPage(0)
    setCursors([null])
  }

  return (
    <TablePagination
      component="div"
      count={-1}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      nextIconButtonProps={{
        disabled: !data?.search.pageInfo.hasNextPage,
      }}
      backIconButtonProps={{ disabled: page === 0 }}
      labelDisplayedRows={() => `Page ${page + 1}`}
    />
  )
}

export default Pagination
