import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useSearchRepositoriesQuery } from '@/app/api/generated'
import { setPage } from '@/store/paginationSlice'
import { RootState } from '@/store/store'
import { Stack } from '@mui/material'

import ResultsTable from './ResultsTable'
import SelectedRepoView from './SelectedRepoView'
import Welcome from './Welcome'

const ContentWrapper = () => {
  const dispatch = useDispatch()

  const { after, before, rowsPerPage } = useSelector(
    (state: RootState) => state.paginationReducer,
  )

  const { finalQuery, selectedRepo } = useSelector(
    (state: RootState) => state.sortReducer,
  )

  const { data } = useSearchRepositoriesQuery(
    { query: finalQuery, first: rowsPerPage, before: before, after: after },
    { skip: !finalQuery },
  )

  useEffect(() => {
    dispatch(setPage(0))
  }, [finalQuery])

  return data ? (
    <Stack
      direction={'row'}
      sx={{
        minHeight: 'calc(100vh - 32px - 80px)',
      }}
    >
      <ResultsTable />
      <SelectedRepoView selectedRepo={selectedRepo} />
    </Stack>
  ) : (
    <Welcome />
  )
}

export default ContentWrapper
