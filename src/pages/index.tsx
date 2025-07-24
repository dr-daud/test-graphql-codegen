import { useEffect, useState } from 'react'

import { useSearchRepositoriesQuery } from '@/app/api/generated'
import { TSortDirection, TSortField } from '@/types/types'
import { TablePagination } from '@mui/material'

import Footer from '@/components/Footer'
import ResultsTable from '@/components/ResultsTable'
import SearchBar from '@/components/SearchBar'
import Welcome from '@/components/Welcome'

export default function MainPage() {
  const [searchValue, setSearchValue] = useState('')
  const [sortField, setSortField] = useState<TSortField>(null)
  const [sortDirection, setSortDirection] = useState<TSortDirection>('desc')
  const [querySearchValue, setQuerySearchValue] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [cursors, setCursors] = useState<(string | null)[]>([null])

  const currentCursor = cursors[page] ?? null

  const handleSort = (field: 'stars' | 'forks' | 'updated') => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
    setPage(0)
    setCursors([null])
  }

  const buildFinalQuery = () => {
    let q = querySearchValue.trim()
    if (sortField) {
      q += ` sort:${sortField}-${sortDirection}`
    }
    return q
  }

  const finalQuery = buildFinalQuery()

  const { data } = useSearchRepositoriesQuery(
    { query: finalQuery, first: rowsPerPage, after: currentCursor },
    { skip: !finalQuery },
  )

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

  useEffect(() => {
    setPage(0)
    setCursors([null])
  }, [finalQuery])

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
    <>
      <SearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setQuerySearchValue={setQuerySearchValue}
      />

      {data ? (
        <>
          <ResultsTable
            data={data}
            handleSort={handleSort}
            sortField={sortField}
            sortDirection={sortDirection}
          />
          <TablePagination
            component="div"
            count={-1}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            nextIconButtonProps={{
              disabled: !data.search.pageInfo.hasNextPage,
            }}
            backIconButtonProps={{ disabled: page === 0 }}
            labelDisplayedRows={() => `Page ${page + 1}`}
          />
        </>
      ) : (
        <Welcome />
      )}

      <Footer />
    </>
  )
}
