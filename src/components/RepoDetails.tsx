import { GetRepositoryDetailsQuery } from '@/app/api/generated'
import { Box, Typography } from '@mui/material'

interface Props {
  repo?: GetRepositoryDetailsQuery
}

const RepoDetails = ({ repo }: Props) => {
  return (
    <Box sx={{ backgroundColor: '#F2F2F2', padding: 3, width: '480px' }}>
      {repo?.node?.__typename === 'Repository' ? (
        <>
          <Typography sx={{ fontSize: 32 }}>{repo.node.name}</Typography>
          <Typography>Описание: {repo.node.description}</Typography>
          <Typography sx={{ mt: 2 }}>{repo.node.licenseInfo?.name}</Typography>
        </>
      ) : null}
    </Box>
  )
}

export default RepoDetails
