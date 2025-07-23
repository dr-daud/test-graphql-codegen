import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import 'dotenv/config'
import { GraphQLClient } from 'graphql-request'

export const client = new GraphQLClient('https://api.github.com/graphql')

export const api = createApi({
  reducerPath: 'baseApi',
  baseQuery: graphqlRequestBaseQuery({
    client,
    prepareHeaders: (headers) => {
      headers.set(
        'Authorization',
        `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      )
      headers.set('User-Agent', 'github-search')
      return headers
    },
  }),
  endpoints: () => ({}),
})
