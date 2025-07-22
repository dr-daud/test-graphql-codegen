import { useState } from 'react'

import {
  SearchRepositoriesQuery,
  useGetRepositoryDetailsQuery,
  useSearchRepositoriesQuery,
} from '@/app/api/generated'
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

interface Props {
  data?: SearchRepositoriesQuery
}

const ResultsTable = ({ data }: Props) => {
  const [selectedRepo, setSelectedRepo] = useState<string>('')
  const { data: repo } = useGetRepositoryDetailsQuery(
    { repoId: String(selectedRepo) },
    { skip: !selectedRepo },
  )

  // const [currentPage, setCurrentPAge] = useState()
  // const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

  // const handleSort = (key: string) => {
  //   setSortConfig((prev) => ({
  //     key,
  //     direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
  //   }));
  // };

  return (
    <Stack sx={{ flexDirection: 'row' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Результаты поиска">
          <TableHead>
            <TableRow sx={{ cursor: 'pointer' }}>
              <TableCell>Название</TableCell>
              <TableCell>Язык</TableCell>
              <TableCell>Число форков</TableCell>
              <TableCell>Число звезд</TableCell>
              <TableCell>Дата обновления</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.search?.nodes?.map((repo, index) => {
              return repo?.__typename === 'Repository' ? (
                <TableRow
                  onClick={() => setSelectedRepo(repo?.id)}
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
                  <TableCell>{repo.updatedAt}</TableCell>
                </TableRow>
              ) : null
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedRepo ? <RepoDetails repo={repo} /> : <NoData />}
    </Stack>
  )
}

export default ResultsTable
