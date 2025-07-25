import { useDispatch, useSelector } from 'react-redux'

import { SearchRepositoriesQuery } from '@/app/api/generated'
import { setSelectedRepo } from '@/store/sortSlice'
import { RootState } from '@/store/store'
import { TableCell, TableRow } from '@mui/material'
import dayjs from 'dayjs'

interface Props {
  data?: SearchRepositoriesQuery
}

const ResultsTableList = ({ data }: Props) => {
  const { selectedRepo } = useSelector((state: RootState) => state.sortReducer)
  const dispatch = useDispatch()

  return (
    <>
      {data?.search?.nodes?.map((repo) => {
        return repo?.__typename === 'Repository' ? (
          <TableRow
            onClick={() => dispatch(setSelectedRepo(repo?.id))}
            key={repo?.id}
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
              cursor: 'pointer',
              backgroundColor: `${selectedRepo === repo?.id ? '#2196F30A' : '#fff'}`,
            }}
          >
            <TableCell component="th" scope="row">
              {repo.name}
            </TableCell>
            <TableCell>{repo.primaryLanguage?.name}</TableCell>
            <TableCell>{repo.forkCount}</TableCell>
            <TableCell>{repo.stargazerCount}</TableCell>
            <TableCell>
              {dayjs(repo.updatedAt).format('D MMMM YYYY, HH:mm')}
            </TableCell>
          </TableRow>
        ) : null
      })}
    </>
  )
}

export default ResultsTableList
