import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useSearchRepositoriesQuery } from '@/app/api/generated'
import { setPage } from '@/store/paginationSlice'
import { setSortDirection, setSortField } from '@/store/sortSlice'
import { RootState } from '@/store/store'
import { TField, TSortDirection } from '@/types/types'
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

const ResultsTable = () => {
  const dispatch = useDispatch()

  const { querySearchValue } = useSelector(
    (state: RootState) => state.repoReducer,
  )

  const { after, before, rowsPerPage } = useSelector(
    (state: RootState) => state.paginationReducer,
  )

  const { sortDirection, selectedRepo, sortField } = useSelector(
    (state: RootState) => state.sortReducer,
  )

  const handleSort = (field: TField) => {
    if (sortField === field) {
      const newDirection: TSortDirection =
        sortDirection === 'asc' ? 'desc' : 'asc'
      dispatch(setSortDirection(newDirection))
    } else {
      dispatch(setSortField(field))
      dispatch(setSortDirection('desc'))
    }
    dispatch(setPage(0))
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
    { query: finalQuery, first: rowsPerPage, before: before, after: after },
    { skip: !finalQuery },
  )

  useEffect(() => {
    dispatch(setPage(0))
  }, [finalQuery])

  return data ? (
    <Stack sx={{ flexDirection: 'row' }}>
      <Stack sx={{ flex: '1' }}>
        <TableContainer>
          <Table aria-label="Результаты поиска">
            <TableHead>
              <ResultsLabelsRow handleSort={handleSort} />
            </TableHead>
            <TableBody>
              <ResultsTableList data={data} />
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination />
      </Stack>
      {selectedRepo ? <RepoDetails /> : <NoData />}
    </Stack>
  ) : (
    <Welcome />
  )
}

export default ResultsTable
