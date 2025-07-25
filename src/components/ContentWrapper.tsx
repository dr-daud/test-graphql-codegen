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

  const { querySearchValue } = useSelector(
    (state: RootState) => state.repoReducer,
  )

  const { after, before, rowsPerPage } = useSelector(
    (state: RootState) => state.paginationReducer,
  )

  const { sortDirection, selectedRepo, sortField } = useSelector(
    (state: RootState) => state.sortReducer,
  )

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
      <ResultsTable finalQuery={finalQuery} />
      {selectedRepo ? <RepoDetails /> : <NoData />}
    </Stack>
  ) : (
    <Welcome />
  )
}

export default ContentWrapper
