import {
  GetRepositoryDetailsQuery,
  useGetRepositoryDetailsQuery,
} from '@/app/api/generated'
import { Box, Typography } from '@mui/material'

interface Props {
  selectedRepo: string
}

const RepoDetails = ({ selectedRepo }: Props) => {
  const { data } = useGetRepositoryDetailsQuery(
    { repoId: String(selectedRepo) },
    { skip: !selectedRepo },
  )

  return (
    <Box sx={{ backgroundColor: '#F2F2F2', padding: 3, width: '480px' }}>
      {data?.node?.__typename === 'Repository' ? (
        <>
          <Typography sx={{ fontSize: 32 }}>{data.node.name}</Typography>
          <Typography>Описание: {data.node.description}</Typography>
          <Typography sx={{ mt: 2 }}>{data.node.licenseInfo?.name}</Typography>
        </>
      ) : null}
    </Box>
  )
}

export default RepoDetails
