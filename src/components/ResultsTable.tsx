import { useState } from 'react'

import {
  SearchRepositoriesQuery,
  useGetRepositoryDetailsQuery,
} from '@/app/api/generated'
import { TField, TSortDirection, TSortField } from '@/types/types'
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

import NoData from './NoData'
import RepoDetails from './RepoDetails'
import ResultsTableList from './ResultsTableList'

interface Props {
  data?: SearchRepositoriesQuery
  handleSort: (field: TField) => void
  sortField: TSortField
  sortDirection: TSortDirection
}

const ResultsTable = ({
  data,
  handleSort,
  sortField,
  sortDirection,
}: Props) => {
  const [selectedRepo, setSelectedRepo] = useState<string>('')
  const { data: repo } = useGetRepositoryDetailsQuery(
    { repoId: String(selectedRepo) },
    { skip: !selectedRepo },
  )
  return (
    <Stack sx={{ flexDirection: 'row' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Результаты поиска">
          <TableHead>
            <TableRow sx={{ cursor: 'pointer' }}>
              <TableCell>Название</TableCell>
              <TableCell>Язык</TableCell>
              <TableCell onClick={() => handleSort('forks')}>
                Число форков{' '}
                {sortField === 'forks' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableCell>
              <TableCell onClick={() => handleSort('stars')}>
                Число звезд{' '}
                {sortField === 'stars' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableCell>
              <TableCell onClick={() => handleSort('updated')}>
                Дата обновления{' '}
                {sortField === 'updated' &&
                  (sortDirection === 'asc' ? '↑' : '↓')}
              </TableCell>
            </TableRow>
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
      {selectedRepo ? <RepoDetails repo={repo} /> : <NoData />}
    </Stack>
  )
}

export default ResultsTable
