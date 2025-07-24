import { useEffect, useState } from 'react'

import {
  useGetRepositoryDetailsQuery,
  useSearchRepositoriesQuery,
} from '@/app/api/generated'
import { TSortDirection, TSortField } from '@/types/types'
import {
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from '@mui/material'

import NoData from './NoData'
import Pagination from './Pagination'
import RepoDetails from './RepoDetails'
import ResultsRow from './ResultsRow'
import ResultsTableList from './ResultsTableList'
import Welcome from './Welcome'

const ResultsTable = ({ querySearchValue }: { querySearchValue: string }) => {
  const [selectedRepo, setSelectedRepo] = useState<string>('')
  const [cursors, setCursors] = useState<(string | null)[]>([null])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortDirection, setSortDirection] = useState<TSortDirection>('desc')
  const [sortField, setSortField] = useState<TSortField>(null)

  const currentCursor = cursors[page] ?? null

  const { data: repo } = useGetRepositoryDetailsQuery(
    { repoId: String(selectedRepo) },
    { skip: !selectedRepo },
  )

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

  return data ? (
    <Stack sx={{ flexDirection: 'row' }}>
      <Stack sx={{ flex: '1' }}>
        <TableContainer>
          <Table aria-label="Результаты поиска">
            <TableHead>
              <ResultsRow
                handleSort={handleSort}
                sortField={sortField}
                sortDirection={sortDirection}
              />
            </TableHead>
            <TableBody>
              <ResultsTableList
                data={data}
                setSelectedRepo={setSelectedRepo}
                selectedRepo={selectedRepo}
              />
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          data={data}
          setCursors={setCursors}
        />
      </Stack>
      {selectedRepo ? <RepoDetails repo={repo} /> : <NoData />}
    </Stack>
  ) : (
    <Welcome />
  )
}

export default ResultsTable
