export type TSortField = 'stars' | 'forks' | 'updated' | null

export type TSortDirection = 'asc' | 'desc'

export type TField = Exclude<TSortField, null>

// export type TCursor = string | null

// export type SetAfter = React.Dispatch<React.SetStateAction<TCursor>>
// export type SetBefore = React.Dispatch<React.SetStateAction<TCursor>>
