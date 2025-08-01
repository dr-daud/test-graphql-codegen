export type TSortField = 'stars' | 'forks' | 'updated' | null

export type TSortDirection = 'asc' | 'desc'

export type TField = Exclude<TSortField, null>
