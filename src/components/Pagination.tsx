import { useEffect } from 'react'

import { SearchRepositoriesQuery } from '@/app/api/generated'
import { TablePagination } from '@mui/material'

type SetCursors = React.Dispatch<React.SetStateAction<(string | null)[]>>

interface Props {
  page: number
  setPage: (number: number) => void
  rowsPerPage: number
  setRowsPerPage: (number: number) => void
  data?: SearchRepositoriesQuery
  setCursors: SetCursors
  cursors: (string | null)[]
}

const Pagination = ({
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  data,
  setCursors,
  cursors,
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

  useEffect(() => {
    const endCursor = data?.search.pageInfo?.endCursor

    if (
      endCursor &&
      cursors.length === page + 1 &&
      cursors[cursors.length - 1] !== endCursor
    ) {
      setCursors((prev) => [...prev, endCursor])
    }
  }, [data, page, cursors])

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
