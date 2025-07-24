import { useEffect, useState } from 'react'

import { useSearchRepositoriesQuery } from '@/app/api/generated'
import { TCursors, TField, TSortDirection, TSortField } from '@/types/types'
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
import ResultsLabelsRow from './ResultsLabelsRow'
import ResultsTableList from './ResultsTableList'
import Welcome from './Welcome'

const ResultsTable = ({ querySearchValue }: { querySearchValue: string }) => {
  const [selectedRepo, setSelectedRepo] = useState<string>('')
  const [cursors, setCursors] = useState<TCursors>([null])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortDirection, setSortDirection] = useState<TSortDirection>('desc')
  const [sortField, setSortField] = useState<TSortField>(null)

  const currentCursor = cursors[page] ?? null

  const handleSort = (field: TField) => {
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
    setPage(0)
    setCursors([null])
  }, [finalQuery])

  return data ? (
    <Stack sx={{ flexDirection: 'row' }}>
      <Stack sx={{ flex: '1' }}>
        <TableContainer>
          <Table aria-label="Результаты поиска">
            <TableHead>
              <ResultsLabelsRow
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
          cursors={cursors}
        />
      </Stack>
      {selectedRepo ? <RepoDetails selectedRepo={selectedRepo} /> : <NoData />}
    </Stack>
  ) : (
    <Welcome />
  )
}

export default ResultsTable
