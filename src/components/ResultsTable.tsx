import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useSearchRepositoriesQuery } from '@/app/api/generated'
import { setPage } from '@/store/paginationSlice'
import { setSortDirection, setSortField } from '@/store/sortSlice'
import { RootState } from '@/store/store'
import { TField, TSortDirection } from '@/types/types'
import {
  Pagination,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from '@mui/material'

import ResultsLabelsRow from './ResultsLabelsRow'
import ResultsTableList from './ResultsTableList'

const ResultsTable = ({ finalQuery }: { finalQuery: string }) => {
  const { sortDirection, sortField } = useSelector(
    (state: RootState) => state.sortReducer,
  )

  const { after, before, rowsPerPage } = useSelector(
    (state: RootState) => state.paginationReducer,
  )

  const dispatch = useDispatch()

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

  const { data } = useSearchRepositoriesQuery(
    { query: finalQuery, first: rowsPerPage, before: before, after: after },
    { skip: !finalQuery },
  )

  return (
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
  )
}

export default ResultsTable
