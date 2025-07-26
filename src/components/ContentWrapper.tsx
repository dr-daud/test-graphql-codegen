import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useSearchRepositoriesQuery } from '@/app/api/generated'
import { setPage } from '@/store/paginationSlice'
import { RootState } from '@/store/store'
import { Stack } from '@mui/material'

import NoData from './NoData'
import RepoDetails from './RepoDetails'
import ResultsTable from './ResultsTable'
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
    <Stack sx={{ flexDirection: 'row' }}>
      <ResultsTable />
      {selectedRepo ? <RepoDetails /> : <NoData />}
    </Stack>
  ) : (
    <Welcome />
  )
}

export default ContentWrapper
