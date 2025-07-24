export type TSortField = 'stars' | 'forks' | 'updated' | null

export type TSortDirection = 'asc' | 'desc'

export type TField = Exclude<TSortField, null>

export type TCursors = (string | null)[]

export type SetCursors = React.Dispatch<React.SetStateAction<TCursors>>
