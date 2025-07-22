import { Box } from '@mui/material'

const NoData = () => {
  return (
    <Box
      sx={{
        fontSize: '14px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        width: '480px',
      }}
    >
      Выберите репозиторий
    </Box>
  )
}

export default NoData
