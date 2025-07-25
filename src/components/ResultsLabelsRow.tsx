import { useSelector } from 'react-redux'

import { RootState } from '@/store/store'
import { TField } from '@/types/types'
import { TableCell, TableRow } from '@mui/material'

interface Props {
  handleSort: (field: TField) => void
}

const ResultsLabelsRow = ({ handleSort }: Props) => {
  const { sortDirection, sortField } = useSelector(
    (state: RootState) => state.sortReducer,
  )
  return (
    <TableRow sx={{ cursor: 'pointer' }}>
      <TableCell>Название</TableCell>
      <TableCell>Язык</TableCell>
      <TableCell onClick={() => handleSort('forks')}>
        Число форков{' '}
        {sortField === 'forks' && (sortDirection === 'asc' ? '↑' : '↓')}
      </TableCell>
      <TableCell onClick={() => handleSort('stars')}>
        Число звезд{' '}
        {sortField === 'stars' && (sortDirection === 'asc' ? '↑' : '↓')}
      </TableCell>
      <TableCell onClick={() => handleSort('updated')}>
        Дата обновления{' '}
        {sortField === 'updated' && (sortDirection === 'asc' ? '↑' : '↓')}
      </TableCell>
    </TableRow>
  )
}

export default ResultsLabelsRow
